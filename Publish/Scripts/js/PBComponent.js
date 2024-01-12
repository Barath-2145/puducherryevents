class PBCompnent {
    constructor(componentElementId) {
        this._componentElementId = componentElementId;
        this._init();

        //console.log(this.loginPanel);
    }
    _sanitizeName(str) {
        var arr = str.split("-");
        var sanitizedName = arr[0];
        if (arr.length > 1) {
            for (var i = 1; i < arr.length; i++) {
                sanitizedName += arr[i].substring(0, 1).toUpperCase() + arr[i].substring(1);
            }
        }
        //console.log(arr);
        //console.log(sanitizedName);
        return sanitizedName;
    }
    _init() {
        var rootEl = document.getElementById(this._componentElementId);


        var sn = this._sanitizeName(this._componentElementId);
        this[sn] = rootEl;


        // find all elements inside the component
        var elements = rootEl.querySelectorAll("*[id]");
        //console.log(elements);
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            var elID = el.getAttribute("id");
            sn = this._sanitizeName(elID);
            this[sn] = el;
            //console.log(sn);
        }
    }

    reinitComponent() {
        this._init();
    }
    toString() {
        return this._componentElementId;
    }
}