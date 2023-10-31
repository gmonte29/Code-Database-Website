const fileSystemData = {
    name: "root",
    type: "folder",
    children: [
        {
            name: "Documents",
            type: "folder",
            children: [
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
    ],
};

function renderFileSystem(node, parentElement) {
    const ul = document.createElement("ul");

    node.children.forEach((child) => {
        const li = document.createElement("li");
        li.textContent = child.name;
        li.className = child.type;

        if (child.type === "folder") {
            li.classList.add("folder");
            li.addEventListener("click", () => toggleFolder(child, li));
        }

        ul.appendChild(li);
    });

    parentElement.appendChild(ul);

    const createFolderButton = document.getElementById("createFolder");
    const uploadFileButton = document.getElementById("uploadFile");

    createFolderButton.addEventListener("click", () => {
        const folderName = prompt("Enter folder name:");
        if (folderName) {
            node.children.push({ name: folderName, type: "folder", children: [] });
            renderFileSystem(node, parentElement);
        }
    });

    uploadFileButton.addEventListener("click", () => {
        const fileName = prompt("Enter file name:");
        if (fileName) {
            node.children.push({ name: fileName, type: "file" });
            renderFileSystem(node, parentElement);
        }
    });
}

function toggleFolder(folder, element) {
    const ul = element.querySelector("ul");

    if (ul) {
        // Folder is open, close it
        ul.style.display = ul.style.display === "none" ? "block" : "none";
    } else {
        // Folder is closed, open it and render its contents
        renderFileSystem(folder, element);
    }
}

// Initialize the file system viewer with the root folder
renderFileSystem(fileSystemData, document.getElementById("fileSystem"));