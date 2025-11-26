frappe.ui.form.on('Communication', {
    onload_post_render: function(frm) {
        // Wait for email compose field
        setTimeout(() => {

            // Target editor area
            let editorElement = document.querySelector(".frappe-control[data-fieldname='content'] textarea");

            if (!editorElement) {
                console.log("Email field not found!");
                return;
            }

            // Hide Frappe default textarea
            editorElement.style.display = "none";

            // Create container for new editor
            let newEditorDiv = document.createElement("div");
            newEditorDiv.id = "custom-rich-editor";
            editorElement.parentNode.appendChild(newEditorDiv);

            // Load SunEditor library
            SunEditor.create('custom-rich-editor', {
                height: 300,
                buttonList: [
                    ['undo', 'redo'],
                    ['font', 'fontSize'],
                    ['bold', 'underline', 'italic'],
                    ['fontColor', 'hiliteColor'],
                    ['align', 'list'],
                    ['table'],
                    ['link', 'image'],
                    ['codeView']
                ]
            }).then(editor => {
                // Sync content back to hidden textarea
                editor.onChange = function(contents) {
                    frm.set_value("content", contents);
                };
            });

        }, 500);
    }
});
