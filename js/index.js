import {parse, HtmlGenerator} from 'latex.js'

import("../pkg/index.js").then(calculatex => {
    let generator = new HtmlGenerator({hyphenate: false});
    document.head.appendChild(generator.stylesAndScripts("https://cdn.jsdelivr.net/npm/latex.js@0.12.4/dist/"))

    window.render = () => {
        generator.reset();
        let input = "\n" + document.getElementById("text_input").value + "\n";
        let latex = calculatex.run_calculatex(input);

        if (latex.startsWith("\\document")) {
            let rendered = parse(latex, {generator: generator}).domFragment();

            document.getElementById("output").innerHTML = "";
            document.getElementById("output").appendChild(rendered);
        } else {
            document.getElementById("output").innerHTML = latex;
        }
    };
}).catch(console.error);
