import {parse, HtmlGenerator} from 'latex.js'

import("../pkg/index.js").then(calculatex => {
    let generator = new HtmlGenerator({hyphenate: false});
    document.head.appendChild(generator.stylesAndScripts("https://cdn.jsdelivr.net/npm/latex.js@0.12.4/dist/"))

    window.render = (input) => {
        generator.reset();

        try {
            let latex = calculatex.run_calculatex(input);
            let rendered = parse(latex, {generator: generator}).domFragment();

            document.getElementById("error").innerHTML = "";
            document.getElementById("output").innerHTML = "";
            document.getElementById("output").appendChild(rendered);
        } catch (e) {
            document.getElementById("error").innerHTML = e;
        }
    };
}).catch(console.error);
