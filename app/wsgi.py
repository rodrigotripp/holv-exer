from app import app
from whitenoise import WhiteNoise

app.wsgi_app = WhiteNoise(app.wsgi_app, root='static/', prefix='/')

if __name__ == "__main__":
    app.run()