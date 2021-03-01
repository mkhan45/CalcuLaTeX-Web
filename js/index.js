import {parse, HtmlGenerator} from 'latex.js'
import 'brace'
import "../css/site.css"

window.onload = () => {
    import("../pkg/index.js").then(calculatex => {
        let generator = new HtmlGenerator({hyphenate: false});
        document.head.appendChild(generator.stylesAndScripts("https://cdn.jsdelivr.net/npm/latex.js@0.12.4/dist/"))

        var editor = ace.edit("editor");

        try {
            const cookieValue = document.cookie
                .split('; ')
                .find(row => row.startsWith('last_input'))
                .split('=')[1];
            if (cookieValue != undefined) {
                editor.setValue(unescape(cookieValue), 0);
                editor.clearSelection();
            }
        } catch {}

        // very strange things happen when it renders
        // directly off of editor.on('change')
        var changed = true;

        let render_textbox = () => {
            const e = editor.getValue();
            render(e + "\n");
        }

        setTimeout(() => setInterval(() => {
            if (changed) {
                render_textbox();
                changed = false;
            }
        }, 300), 500);

        editor.on('change', () => {
            changed = true;
        });

        window.render = (input) => {
            generator.reset();
            document.cookie = "last_input = " + escape(input) + ";" + "SameSite=Lax";

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
}
