# Node based OCR trainer
Generates images of text and associated bounding boxes for each glyph/character. These images will be used to train neural net based OCR.

# pre-requisites
## node canvas
The npm library 'canvas' is part of the dev dependencies for this project and requires Cairo to be installed. 
### Cairo
You can [visit the canvas page](https://www.npmjs.com/package/canvas) for more details but in short (taken from the [Canvas github page](https://github.com/Automattic/node-canvas))

OS | Command
----- | -----
OS X | `brew install pkg-config cairo libpng jpeg giflib`
Ubuntu | `sudo apt-get install libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++`
Fedora | `sudo yum install cairo cairo-devel cairomm-devel libjpeg-turbo-devel pango pango-devel pangomm pangomm-devel giflib-devel`
Solaris | `pkgin install cairo pkg-config xproto renderproto kbproto xextproto`
Windows | [Instructions on our wiki](https://github.com/Automattic/node-canvas/wiki/Installation---Windows)

### Node
Of course you'll need node. You'll need a version that natively supports ES6/7 or you'll need to alter the npm scripts in [package.json](https://github.com/mlennox/NodeOCRTraining/blob/master/package.json) to use the --harmony flag.
