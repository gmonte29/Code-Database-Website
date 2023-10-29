document.addEventListener('DOMContentLoaded', () => {
    const fileSystemData = {
        name: "root",
        type: "folder",
        children: [
            
        /* {
                name: "Documents",
                type: "folder",
                children: 
                    { name: "document1.txt", type: "file" },
                    { name: "document2.txt", type: "file" },
                ],
            },
            {
                name: "Pictures",
                type: "folder",
                children: [
                    { name: "picture1.jpg", type: "file" },
                    { name: "picture2.jpg", type: "file" },
                ],
            },
            
        */],
    };

    const fileSystemElement = document.getElementById("fileSystem");

    function renderFileSystem(node, parentElement, currentPath) {
        const ul = document.createElement("ul");
    
        node.children.forEach((child) => {
            const li = document.createElement("li");
    
            // Create a link for folders
            if (child.type === "folder") {
                const folderLink = document.createElement("a");
                folderLink.textContent = child.name;
                folderLink.href = currentPath + "/" + child.name; // Define the link URL
    
                li.appendChild(folderLink);
            } else {
                // For files, display the name without a link
                li.textContent = child.name;
            }
    
            ul.appendChild(li);
        });
    
        parentElement.appendChild(ul);
    }


    renderFileSystem(fileSystemData, document.getElementById("fileSystem"), "");

    const createFolderButton = document.getElementById("createFolder");
    const uploadFileButton = document.getElementById("uploadFile");

    createFolderButton.addEventListener("click", () => {
        const folderName = prompt("Enter folder name:");
        if (folderName) {
            fileSystemData.children.push({ name: folderName, type: "folder", children: [] });
            renderFileSystem(fileSystemData, fileSystemElement);
        }
    });

    uploadFileButton.addEventListener("click", () => {
        const fileName = prompt("Enter file name:");
        if (fileName) {
            fileSystemData.children.push({ name: fileName, type: "file" });
            renderFileSystem(fileSystemData, fileSystemElement);
        }
    });
});