# topola-webpack

This is a very simple genealogy viewer based on [topola](https://github.com/PeWu/topola). Its main purpose is to allow deploying of small, self-contained interactive genealogy trees to a generic HTTP server.

Essential part of the code is based on the [“Animations” example](https://stackblitz.com/edit/topola-animations) from [topola](https://github.com/PeWu/topola).

Features:
* **no need for npm (or any other back-end) on a destination server**: the entire bundle, including pre-processed genealogical data, is prepared and minified with webpack
* **supports hash-based shortcuts for individuals**: you can easily save URLs to start browsing from the selected individual, e.g. `http://example.org/my-tree/#I123#0`.

## Usage

You *will* need npm, but only for building the bundle.

After cloning/copying the repository, run
```
./build.sh mydata.ged index.html
```
where `mydata.ged` is a path to your personal genealogical data in GEDCOM format, and `index.html` is the name for the standalone HTML file to be generated.

**That's it!** The bundle (HTML+JS) will be ready under the given path. You can either copy it to the destination server or simply open it in a browser.