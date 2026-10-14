from PIL import Image, ImageDraw, ImageFont

def apply_banner_text(input_path, output_path, line1, line2=None, subtitle="An Insightful Guide on"):
    im = Image.open(input_path)
    if im.size != (1024, 578):
        im = im.resize((1024, 578), Image.Resampling.LANCZOS)
    
    # Sample background color around right side
    bg_top = im.getpixel((800, 120))
    bg_bottom = im.getpixel((800, 480))
    
    draw = ImageDraw.Draw(im)
    # Clear text area with smooth vertical gradient matching image background
    for y in range(150, 460):
        t = (y - 150) / 310.0
        r = int(bg_top[0] * (1 - t) + bg_bottom[0] * t)
        g = int(bg_top[1] * (1 - t) + bg_bottom[1] * t)
        b = int(bg_top[2] * (1 - t) + bg_bottom[2] * t)
        draw.line([(580, y), (1024, y)], fill=(r, g, b))
    
    font_subtitle = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 28)
    font_title = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 44)
    
    text_color = (13, 33, 103) # deep navy
    sub_color = (26, 42, 78)   # dark slate
    
    # Calculate y positions based on whether line2 exists
    if line2:
        draw.text((610, 205), subtitle, fill=sub_color, font=font_subtitle)
        draw.text((610, 260), line1, fill=text_color, font=font_title)
        draw.text((610, 318), line2, fill=text_color, font=font_title)
    else:
        draw.text((610, 225), subtitle, fill=sub_color, font=font_subtitle)
        draw.text((610, 280), line1, fill=text_color, font=font_title)
        
    im.save(output_path, quality=95)
    print(f"Applied banner text to {output_path}")

if __name__ == "__main__":
    import sys
    # sys.argv: input_path output_path line1 [line2]
    line2 = sys.argv[4] if len(sys.argv) > 4 else None
    apply_banner_text(sys.argv[1], sys.argv[2], sys.argv[3], line2)
