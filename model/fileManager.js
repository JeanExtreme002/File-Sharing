const path = require("path");
const fs = require("fs");


class FileManager {

    constructor(main_path) {

        if (!fs.existsSync(main_path)) {
            fs.mkdirSync(main_path);
        }

        this.path = main_path;
        this.clearInfo();
    }

    clearInfo() {

        this.info = {filename: null, size: null, absolute: null};
    }

    exists() {

        return fs.existsSync(this.info.absolute) || this.clearInfo();
    }

    remove() {

        if (this.exists()) {
            fs.unlink(this.info.absolute, function(err){});
        }
    }

    upload(file, removeLast = true) {

        const absolute = path.resolve(this.path, file.name);

        file.mv(absolute);
        
        if (removeLast) { 
            this.remove(); 
        }

        this.info.filename = file.name;
        this.info.size = file.size;
        this.info.absolute = absolute;
    }
}

module.exports = FileManager;