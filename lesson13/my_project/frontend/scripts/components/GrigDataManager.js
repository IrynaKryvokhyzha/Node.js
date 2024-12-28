class GridDataManager {
  static createGridItem(item, createLinkFunction, deleteFunction) {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("product-item");

    // Image
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("product-image");
    const img = document.createElement("img");
    img.src = item.image; // Directly use the image field from the product
    img.alt = item.title; // Use title for alt text
    imageDiv.appendChild(img);
    itemDiv.appendChild(imageDiv);

    // Title
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("product-title");
    titleDiv.textContent = item.title;
    itemDiv.appendChild(titleDiv);

    // Price
    const priceDiv = document.createElement("div");
    priceDiv.classList.add("product-price");
    priceDiv.textContent = "$ " + item.price;
    itemDiv.appendChild(priceDiv);

    // Description
    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("product-description");
    descriptionDiv.textContent = item.description;
    itemDiv.appendChild(descriptionDiv);

    // Edit Link
    if (createLinkFunction) {
      const editLinkDiv = document.createElement("div");
      const editLink = document.createElement("a");
      editLink.classList.add("button-edit");
      editLink.href = createLinkFunction(item._id);
      editLink.textContent = "Edit";
      editLinkDiv.appendChild(editLink);
      itemDiv.appendChild(editLinkDiv);
    }

    // Delete Button
    if (deleteFunction) {
      const deleteButtonDiv = document.createElement("div");
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("button-delete");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = () => deleteFunction(item._id);
      deleteButtonDiv.appendChild(deleteButton);
      itemDiv.appendChild(deleteButtonDiv);
    }

    return itemDiv;
  }

  static createGridFromList(data, createLinkFunction, deleteFunction) {
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("product-container");

    // Create grid items (for each product)
    data.forEach((item) => {
      const itemDiv = this.createGridItem(
        item,
        createLinkFunction,
        deleteFunction
      );
      gridContainer.appendChild(itemDiv);
    });

    return gridContainer;
  }
}
