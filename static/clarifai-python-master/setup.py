try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup

setup(
    description='Clarifai API Python Client',
    author='Clarifai',
    url='https://github.com/clarifai/clarifai_py',
    author_email='support@clarifai.com',
    version='0.3.1',
    install_requires=['six'],
    namespace_packages=['clarifai'],
    packages=['clarifai.client'],
    scripts=[],
    name='clarifai',
)
