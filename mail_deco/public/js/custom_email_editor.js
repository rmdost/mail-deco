frappe.ui.form.on('Communication', {
    onload_post_render: function(frm) {
        // Wait for field to render
        setTimeout(() => {
            let textarea = document.querySelector(".frappe-control[data-fieldname='content'] textarea");

            if (!textarea) {
                console.log("Email content field not found!");
                return;
            }

            // Hide default textarea
            textarea.style.display = "none";

            // Create container for editor
            let editorDiv = document.createElement("div");
            editorDiv.id = "custom-rich-editor";
            textarea.parentNode.appendChild(editorDiv);

            // Initialize SunEditor
            const editor = SunEditor.create('custom-rich-editor', {
                height: 300,
                buttonList: [
                    ['undo', 'redo'],
                    ['font', 'fontSize'],
                    ['bold', 'underline', 'italic'],
                    ['fontColor', 'hiliteColor'],
                    ['align', 'list'],
                    ['table'],
                    ['link', 'image'],
                    ['codeView']   // HTML toggle
                ]
            });

            // Sync editor content to Frappe field
            editor.onChange = function(contents) {
                frm.set_value("content", contents);
            };

        }, 500);
    }
});
