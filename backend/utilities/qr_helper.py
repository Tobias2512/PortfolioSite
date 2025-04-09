from io import BytesIO
from PIL import Image, ImageDraw
import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers.pil import RoundedModuleDrawer

def generate_qr_code(data):
    qr = qrcode.QRCode(
        version=6,
        error_correction=qrcode.constants.ERROR_CORRECT_L
    )
    qr.add_data(data)
    qr.make()
    img = qr.make_image(image_factory=StyledPilImage, module_drawer=RoundedModuleDrawer()).convert("RGB")
    return img

def create_white_square(qr):
    size = 90
    pos = ((qr.size[0] - size) // 2, (qr.size[1] - size) // 2)
    draw = ImageDraw.Draw(qr)
    draw.rectangle([pos, (pos[0] + size, pos[1] + size)], fill="white")
    return qr

def embed_image_in_qr(qr, image_file):
    size = 90
    image = Image.open(image_file).resize((size, size), Image.Resampling.LANCZOS)
    pos = ((qr.size[0] - size) // 2, (qr.size[1] - size) // 2)
    qr.paste(image, pos)
    return qr

def generate_qr_code_with_image(data, image_file):
    qr = generate_qr_code(data)
    qr = create_white_square(qr)
    qr = embed_image_in_qr(qr, image_file)
    buffer = BytesIO()
    qr.save(buffer, format='PNG')
    buffer.seek(0)
    return buffer
