from fastapi import FastAPI, UploadFile, Form, File, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from utilities.qr_helper import generate_qr_code
import io
import os
from PIL import Image

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://tobiashagenaars-portfolio.netlify.app"],
    allow_credential=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate_qr/")
async def generate_qr(
    data: str = Form(...),
    module_drawer: int = Form(...),
    image: UploadFile = File(None)
):
    # Controleer of de data en module_drawer valide zijn
    if not data or len(data.strip()) == 0:
        raise HTTPException(status_code=400, detail="Data is required.")
    
    if module_drawer not in [1, 2, 3, 4, 5, 6]:
        raise HTTPException(status_code=400, detail="Invalid module drawer type.")
    
    # Controleer of het geüploade bestand een afbeelding is
    image_path = None
    if image:
        if image.content_type not in ["image/png", "image/jpeg", "image/jpg"]:
            raise HTTPException(status_code=400, detail="Invalid image format. Only PNG and JPG are allowed.")
        
        # Sla tijdelijk de afbeelding op
        image_path = f"temp_{image.filename}"
        with open(image_path, "wb") as f:
            f.write(await image.read())
        
        # Zorg ervoor dat het bestand een geldige afbeelding is
        try:
            img = Image.open(image_path)
            img.verify()  # Zorg ervoor dat het een geldige afbeelding is
        except Exception as e:
            raise HTTPException(status_code=400, detail="Uploaded file is not a valid image.")
    
    try:
        # Genereer de QR-code met behulp van je helper
        qr_img = generate_qr_code(data, image_path, module_drawer)
    finally:
        # Verwijder het tijdelijke bestand (als het is aangemaakt)
        if image_path and os.path.exists(image_path):
            os.remove(image_path)

    # Zet de afbeelding in een in-memory buffer
    img_io = io.BytesIO()
    qr_img.save(img_io, format='PNG')
    img_io.seek(0)

    # Geef de gegenereerde QR-code terug als een streaming response
    return StreamingResponse(img_io, media_type="image/png")
