// Fabric JS version 5.2.1

//  !   Section: Canvas initialization  !
//  Function: Initialize canvas
const initCanvas = (id) =>{
    return new fabric.Canvas(id, {
        width: 1800,
        height: 580,
        backgroundColor: 'white'
    })
}



//  !   Section: Draw functions !
//  Function: Turn off brush mode 
function offBrush() {
    //Disabling brush type selectbox.
    document.getElementById('lbBrushType').disabled = true;

    //Deactivating the brush.
    console.log('Brush deactived.')
    currentMode = ''
    canvas.isDrawingMode = false

    //Activating eraser while brush is not active
    document.getElementById('btnEraser').disabled = false;

    //btnBrush deactive color.
    document.getElementById("btnBrush").style.backgroundColor = btnOri;
    console.log(btnOri)
}

// Function: Turn off eraser
function offEraser(){
    //Deactivating the eraser
    currentMode = ''
    canvas.isDrawingMode = false

    //Activating brush again
    document.getElementById('btnBrush').disabled = false;

    //Setting brush type according to current value of brush box
    changeBrushType(currBrush())

    ////btnEraser deactivated color.
    document.getElementById("btnEraser").style.backgroundColor = btnOri
    
    console.log('Eraser deactivated.')
}

//  Function: Draw mode On / Off
const draw = (modes) => {
    //IF-ELSE:  Check if mode.draw is on or off
    if (modes == mode.draw){
        if (currentMode === mode.draw){
            // Turn off brush
            offBrush()
        }else{
            //Turn on brush
            //Enabling brush type selectbox.
            document.getElementById('lbBrushType').disabled = false;

            //Activating the brush.
            console.log('Brush activated.')
            changeBrushType(currentBrush) // Change brush type to the selected one / currently used brush

            currentMode = mode.draw
            canvas.isDrawingMode = true

            canvas.renderAll()

            //Deactivating eraser while brush is active
            document.getElementById('btnEraser').disabled = true;

            //btnBrush active color.
            document.getElementById("btnBrush").style.backgroundColor = btnActive;
            console.log(btnActive)
        }
    }else if (modes === mode.eraser){
        if (currentMode === mode.eraser){
            //Turn off eraser
            offEraser()
        }else{
            //Turn on eraser
            //Activating the eraser
            console.log('Eraser activated.')
            currentMode = mode.eraser
            canvas.isDrawingMode = true
            canvas.freeDrawingBrush = new fabric.EraserBrush(canvas)
            canvas.freeDrawingBrush.width = document.getElementById('brushWidth').value
            document.getElementById("btnEraser").style.backgroundColor = btnOri

            //Deactivating brush while eraser is active
            document.getElementById('btnBrush').disabled = true;

            //btnEraser active color.
            document.getElementById("btnEraser").style.backgroundColor = btnActive;
        }
    }
}

//Function: Change brush width accoridng to slider value
function changeBrushWidth(){
    const brushWidth = document.getElementById('brushWidth').value
    const bw = parseInt(brushWidth, 10)

    canvas.freeDrawingBrush.width = bw

    console.log('Brush width:  ', bw)
}

document.getElementById('brushWidth').addEventListener('input', changeBrushWidth)


//  Variable: Mode for draw() function
let currentMode;
const mode =  {draw: 'draw', eraser: 'eraser'};

//  Function: Get CSS variable
function getCssVariable(variableName){
    return getComputedStyle(document.documentElement).getPropertyValue(variableName);
}

//  Inserting CSS variable value into this document's variable
const btnActive = getCssVariable('--buttonActive');
const btnOri = getCssVariable('--button');



//  !   Section: Change brush type according to select box  !
function changeBrushType(brushType){
    switch (brushType){
        case 'Pencil Brush':
            canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
            setBrushColor()
            break;

        case 'Spray Brush':
            canvas.freeDrawingBrush = new fabric.SprayBrush(canvas)
            setBrushColor()
            break;

        case 'Circle Brush':
            canvas.freeDrawingBrush = new fabric.CircleBrush(canvas)
            setBrushColor()
            break;
    }
    changeBrushWidth()
    // canvas.isDrawingMode = true; 
}

//Function: Getting the current brush type.
function currBrush() {
    e = document.getElementById("lbBrushType")
    currentBrush = e.value
    console.log(currentBrush)
}

//Function: Setting brush color
function setBrushColor() {
    //Getting a reference to the brush's color picker with bc as variable
    const bc = document.getElementById('brushColor')

    //Getting the current color value from bc
    color = bc.value

    //Setting the color value to the brush
    canvas.freeDrawingBrush.color = color

    canvas.renderAll()
    console.log('Brush color: ', color)
}



//  !   Section: Add Text
//Function: Add textbox
function addTextbox(canvas) {
    offBrush()
    offEraser()

    //Creating textbox
    console.log('Creating Textbox...')
    const tb = new fabric.Textbox('Enter text.', {
        width: 200,
        height: 50,
    });

    //Adding textbox to canvas then centering it.
    canvas.add(tb).setActiveObject(tb)
    tb.center()

    canvas.renderAll()
}



//  !   Section: Initialize canvas  !
// Initializing canvas
const canvas = initCanvas('canvas');



//  !   Section: Change text font family
// Function: Enable or disable lbTextBox
function toggleFontDropdown() {
    const fontSelect = document.getElementById('lbTextFont');
    const activeObject = canvas.getActiveObject();

    // Enable lbTextFont if active object is a Textbox
    if (activeObject && activeObject instanceof fabric.Textbox) {
        // Enable font select box if active object is textbox
        fontSelect.disabled = false;

        //Get the font family of the current textbox
        const currFont = activeObject.get('fontFamily')

        //Change font box  value to the current active textbox font family
        fontSelect.value = currFont;
    } else {
        fontSelect.disabled = true;
    }
}

// Listener: Selection events on the canvas
canvas.on('selection:created', toggleFontDropdown);
canvas.on('selection:updated', toggleFontDropdown);

// Listener: Selection cleared event to disable lbTextFont
canvas.on('selection:cleared', function () {
    document.getElementById('lbTextFont').disabled = true;
});

// Function: Change the font of the active textbox
function changeFont() {
    const fontSelect = document.getElementById('lbTextFont');
    const selectedFont = fontSelect.value;

    // Get the active object
    const activeObject = canvas.getActiveObject();

    // Check if the active object is a Textbox
    if (activeObject && activeObject instanceof fabric.Textbox) {
        activeObject.set('fontFamily', selectedFont);
        canvas.renderAll();
    }
}

// Listener: Changes in the font select box
document.getElementById('lbTextFont').addEventListener('change', changeFont);



//  !   Section: Text Color     !
// Function: Enable/disable the color input based on selection
function toggleTextColorInput() {
    //Getting the active selection 
    const activeObject = canvas.getActiveObject();

    //Assigning input color to a variable
    const tc = document.getElementById('textColor');

    // // Getting the color value of the input color
    // const colorInputVal =  tc.value;

    //Check if the active selection is a textbox
    if (activeObject && activeObject instanceof fabric.Textbox) {
        //Enable the color input when textbox is selected
        document.getElementById('textColor').disabled = false;

        // //Change text color according to current color of input color
        // activeObject.set('fill', colorInputVal); 

        //Getting the current color of the active selection textbox
        const currTbColor = activeObject.get('fill');

        //Changing the value of the input color to the current color of the active selection textbox
        tc.value = currTbColor;
    } else {
        //Disable the color input when textbox isnt selected
        document.getElementById('textColor').disabled = true;

        // Resetting the color of the input box back to black on deselect.
        tc.value =  '#000000';
    }
}

// Function: Change the text color
function setTextColor() {
    //Assigning the input color to a variable tc
    const tc = document.getElementById('textColor');

    //Getting the color value from the variable
    const selectedColor = tc.value;

    //Getting the active selection
    const activeObject = canvas.getActiveObject();

    // Checking if the current active selection is a textbox
    if (activeObject && activeObject instanceof fabric.Textbox) {
        // Set the text color
        activeObject.set('fill', selectedColor); 

        canvas.renderAll(); 
    }
}

// Event listeners
canvas.on('selection:created', toggleTextColorInput);
canvas.on('selection:updated', toggleTextColorInput);
canvas.on('selection:cleared', toggleTextColorInput);
document.getElementById('textColor').addEventListener('input', setTextColor);



//  !   Section: Text Property     !
// Function: Change the font weight of the active textbox
function changeFontWeight() {
    const activeObject = canvas.getActiveObject();

    if (activeObject && activeObject instanceof fabric.Textbox) {
        const currMode = activeObject.get('fontWeight');

        // Toggle font weight
        if (currMode === '800') {
            activeObject.set('fontWeight', 'normal');
            console.log('Unbold text.');
            document.getElementById("btnBold").style.backgroundColor = btnOri;
        } else {
            activeObject.set('fontWeight', '800');
            console.log('Bold text.');
            document.getElementById("btnBold").style.backgroundColor = btnActive;
        }

        // Update button state
        updateButtonState();
        canvas.renderAll();
    }
}

// Function: Change the font italic of the active textbox
function changeFontItalic() {
    const activeObject = canvas.getActiveObject();

    if (activeObject && activeObject instanceof fabric.Textbox) {
        const currMode = activeObject.get('fontStyle');

        // Toggle font italic
        if (currMode === 'italic') {
            //If italic, set normal.
            activeObject.set('fontStyle', 'normal');
            console.log('Unitalicize text.');
            document.getElementById("btnItalic").style.backgroundColor = btnOri;
        } else {
            //If normal, set italic.
            activeObject.set('fontStyle', 'italic');
            console.log('Italicize text.');
            document.getElementById("btnItalic").style.backgroundColor = btnActive;
        }

        // Update button state
        updateButtonState();
        canvas.renderAll();
    }
}

// Function: Change the font underline of the active textbox
function changeFontUnderline() {
    const activeObject = canvas.getActiveObject();

    if (activeObject && activeObject instanceof fabric.Textbox) {
        const currMode = activeObject.get('underline');

        // Toggle font underline
        if (currMode === true) {
            activeObject.set('underline', false);
            console.log('Remove underline text.');
            document.getElementById("btnUnderline").style.backgroundColor = btnOri;
        } else {
            activeObject.set('underline', true);
            console.log('Underline text.');
            document.getElementById("btnUnderline").style.backgroundColor = btnActive;
        }

        // Update button state
        updateButtonState();
        canvas.renderAll();
    }
}

// Function to update text property button state based on the active textbox
function updateButtonState() {
    const activeObject = canvas.getActiveObject();
    const btnBold = document.getElementById('btnBold');
    const btnItalic = document.getElementById('btnItalic');
    const btnUnderline = document.getElementById('btnUnderline');

    if (activeObject && activeObject instanceof fabric.Textbox) {
        btnBold.disabled = false;
        btnItalic.disabled = false;
        btnUnderline.disabled = false;

        // Set button background color based on font weight
        const currModeW = activeObject.get('fontWeight');
        btnBold.style.backgroundColor = (currModeW === '800') ? btnActive : btnOri;

        // Set button background color based on font italic
        const currModeI = activeObject.get('fontStyle');
        btnItalic.style.backgroundColor = (currModeI === 'italic') ? btnActive : btnOri; // Corrected line

        // Set button background color based on font underline
        const currModeU = activeObject.get('underline');
        btnUnderline.style.backgroundColor = (currModeU === true) ? btnActive : btnOri;
    } else {
        btnBold.disabled = true;
        btnItalic.disabled = true;
        btnUnderline.disabled = true;

        // Reset button to original color
        btnBold.style.backgroundColor = btnOri; 
        btnItalic.style.backgroundColor = btnOri; 
        btnUnderline.style.backgroundColor = btnOri; 
    }
}

// Event listeners to manage button states
canvas.on('selection:created', updateButtonState);
canvas.on('selection:updated', updateButtonState);
canvas.on('selection:cleared', updateButtonState);



//  !   Section: Upload image to canvas
//Function: Retrieving uploaded image
const imgAdded = (e) => {
    console.log(e)
    const inputElem = document.getElementById('myImg')
    const file = inputElem.files[0]

    reader.readAsDataURL(file)
}

//Instance of FileReader for reading contents of user-uploaded image, to be used later to process file when it is selected
const reader = new FileReader();
const inputFile = document.getElementById('myImg');

//When img is selected, call the imgAdded function
inputFile.addEventListener('change', imgAdded)

//Function: When FileReader has finished loading the image, create a Fabric.js image object and add it to the canvas
reader.addEventListener("load", () => {
    fabric.Image.fromURL(reader.result, img => {
        img.set('cornerColor', 'white')
        canvas.add(img)
        canvas.requestRenderAll()
    })
})



//  !   Section: Save Canvas As    !
//Function: Save canvas as PNG
function savePNG(){
    const link = document.createElement('a')
    var today = new Date().toLocaleDateString()
    imgName = 'canvas ' + today + '.png'
    link.download = imgName
    link.href = canvas.toDataURL({format: 'png'})
    link.click()
}

//Function: Save canvas as JPG
function saveJPG(){
    const link = document.createElement('a')
    var today = new Date().toLocaleDateString()
    imgName = 'canvas ' + today + '.jpg'
    link.download = imgName
    link.href = canvas.toDataURL({format: 'jpg'})
    link.click()
}

// Function: Save canvas as PDF 
function savePDF(){
    // Access jsPDF from the global window object
    const { jsPDF } = window.jspdf; 

    // Create a new jsPDF instance
    const pdf = new jsPDF({orientation: "landscape"}); 

    // Get the data URL of the canvas
    // Convert canvas to PNG Data URL
    const canvasData = canvas.toDataURL('image/png'); 

    // Add the image to the PDF
    // Adjust the x, y, width, and height as needed
    pdf.addImage(canvasData, 'PNG', 10, 10, 190, 0); 

    // Construct a filename for the PDF
    var today = new Date().toLocaleDateString();
    const imgName = 'canvas ' + today + '.pdf'; 
    
    // Save the PDF with the constructed filename
    pdf.save(imgName);
}



// Variable to store the current image
let currentImage = null; 
let sbTemplate = null;
let cardFront = null;
let cardBack = null;


//      try to chnage this !!!!
// Function: Switch design.
function changeDesignType(designType) {
    // Remove the current image if it exists
    if (currentImage) {
        // Remove the existing image from the canvas
        canvas.remove(currentImage); 

        // Reset the current image variable
        currentImage = null; 
    }

    //Remove signboard template if it exists
    if(sbTemplate){
        canvas.remove(sbTemplate)
    }

    if(cardFront && cardBack){
        canvas.remove(cardFront)
        canvas.remove(cardBack)
    }

    let imageElement;

    switch(designType) {
        case 'Namecard':
            //Creating the base of card templates
            cardFront = createRect(810, 486)
            cardBack = createRect(810, 486)

            //Adding the card templates to the canvas
            canvas.add(cardFront)
            canvas.add(cardBack)

            //Prevent manipulation of card templates
            preventManipulation(cardFront)
            //Adjusting positioning of card from the left side of the canvas
            cardFront.set('left', 50)

            //Prevent manipulation of card templates
            preventManipulation(cardBack)
            //Adjusting positioning of card from the left side of the canvas
            cardBack.set('left', 930)

            cardBack.id = 'templateCardBack'
            cardFront.id = 'templateCardFront'
            
            break;

        case 'Signboard':
            sbTemplate = createRect(1700, 340)
            canvas.add(sbTemplate)

            //Prevent signboard template from being manipulated and centers it
            preventManipulation(sbTemplate)

            sbTemplate.id = 'templateSignboard'

            break;

        case 'TShirtShortSleeve':
            // Get the image element
            imageElement = document.getElementById('TShirtShortSleeve');
            break;

        case 'TShirtLongSleeve':
            imageElement = document.getElementById('TShirtLongSleeve');
            break;

        // Exit if the design type is not recognized
        default:
            console.log('Design type not recognized');
            return; 
    }

    // Initiate Fabric instance
    currentImage = new fabric.Image(imageElement, {
        scaleX: 0.4,
        scaleY: 0.4,     
        lockMovementX: true,
        lockMovementY: true,
    });

    // Add the image to the canvas
    canvas.add(currentImage);

    currentImage.id = 'templateCurrentImage'

    //Prevent manipulation of template images and centers it
    preventManipulation(currentImage)

    // Refresh the canvas to show the new image
    canvas.renderAll(); 

    console.log('Changed design type to: ', designType, currentImage);
}

// Function: Prevent object manipulation
function preventManipulation(object) {
    // Centers object
    object.viewportCenter();

    // Prevent erasing of object
    object.set('erasable', false);

    // Prevent selection of object
    object.set('selectable', false);

    // Preserves cursor type when hovering over object
    object.hoverCursor = 'target';

    // Brings object to the front of the canvas
    object.bringToFront();

    // Override the toObject method to include custom properties
    object.toObject = (function(toObject) {
        return function() {
            return fabric.util.object.extend(toObject.call(this), {
                erasable: this.erasable,
                selectable: this.selectable,
                hoverCursor: this.hoverCursor
            });
        };
    })(object.toObject);
}

//Function: Create rectangle according to template format (specify width and height)
function createRect(w, h) {
    const r = new fabric.Rect({
        width: w,
        height: h,
        fill: '',
        stroke: 'black',
        strokeWidth: 4,
    })
    return r
}



// Setting the default brush.
let currentBrush = new fabric.PencilBrush(canvas);


//  !   Section: Canvas Save State, Clear, and Undo   !
// Array to store canvas states
let canvasHistory = [];

// Array to store excluded objects
let excludedObjects = [];

// Function: Save current state of the canvas
function saveCanvasState() {
    const allObjects = canvas.getObjects(); // Get all objects on the canvas

    // Create a new JSON object for the current objects
    const state = {
        background: canvas.backgroundColor,
        objects: allObjects.map(obj => obj.toObject()) // Convert each object to its JSON representation
    };

    // Push the state to history
    canvasHistory.push(JSON.stringify(state)); // Store the state as a JSON string
}

// Example excluded IDs
const excludedIds = ['cardFront', 'cardBack', 'sbTemplate', 'currentImage'];

// Save the initial state
saveCanvasState();
console.log(canvasHistory); // Logs the canvas history

// Function: Clear canvas while preserving excluded objects
function clearCanvas() {
    // Save current canvas state before clearing
    saveCanvasState();

    // Get all objects on the canvas
    const allObjects = canvas.getObjects();

    // Remove objects that are not in the excluded IDs
    allObjects.forEach(obj => {
        if (!excludedIds.includes(obj.id)) {
            canvas.remove(obj); // Remove the object from the canvas
        }
    });

    // Optionally, you can set the background color
    canvas.setBackgroundColor('white', canvas.renderAll.bind(canvas));

    // Render the canvas to show the changes
    canvas.renderAll();
}

// Function: Undo clearing of canvas by getting the last saved state
function undoClear() {
    if (canvasHistory.length > 0) {
        // Remove the last state from history
        const lastState = canvasHistory.pop();

        // Restore the canvas state
        canvas.loadFromJSON(lastState, () => {
            // Render the canvas after loading
            canvas.renderAll();
        });

        // Assuming you have some objects on the canvas
        canvas.getObjects().forEach(obj => {
            if (excludedIds.includes(obj.id)) {
                preventManipulation(obj); // Apply manipulation prevention to excluded objects
            }
        });


    } else {
        console.log("No states to undo.");
    }
}



// !   Section: Add Shapes !
// Function: Add rectangle.
function addRectangle(canvas) {
    const rect = new fabric.Rect({
        width: 200,
        height: 100,
        fill: '#00bd25',
    });
    canvas.add(rect);
    rect.viewportCenter();
    
    console.log("Added rectangle.");
}

//Function: Add circle.
function addCircle(canvas) {
    const circle = new fabric.Circle({
        radius: 50,
        fill: '#ff9b00',
    })
    canvas.add(circle)
    circle.viewportCenter()

    console.log("Added circle.");
}

//Function: Add triangle.
function addTriangle(canvas) {
    const triangle = new fabric.Triangle({
        fill: '#009dff'
    })
    canvas.add(triangle)
    triangle.viewportCenter()

    console.log("Added triangle.");
}

//Function: Shape color
function toggleShapeColorInput(){
    //Get active object (shape)
    const activeObject = canvas.getActiveObject()

    //Assigning input color to a variable
    const sc = document.getElementById("shapeColor")

    //Check if active selection is a shape
    if(activeObject && (activeObject instanceof fabric.Rect || activeObject instanceof fabric.Circle || activeObject instanceof fabric.Triangle)){
        //Enable shape color input when a shape is selected
        document.getElementById('shapeColor').disabled = false

        //Get current color of active shape
        const currShapeColor = activeObject.get('fill')

        //Change shape color input based on color of active shape
        sc.value = currShapeColor
    } else {
        //Disable shape color input when no shape is selected
        document.getElementById('shapeColor').disabled = true

        //Resetting shape color input back to black on deselect
        sc.value = '#000000'
    }
}

//Function: Change shape color
function setShapeColor(){
    //Assigning shape color input value to a variable sc
    const sc = document.getElementById('shapeColor').value

    //Getting the active shape
    const activeObject = canvas.getActiveObject()

    //Checking is current active selection is a shape
    if(activeObject && (activeObject instanceof fabric.Rect || activeObject instanceof fabric.Circle || activeObject instanceof fabric.Triangle)){
        activeObject.set('fill', sc)

        canvas.renderAll()
    }
}

// Event listeners
canvas.on('selection:created', toggleShapeColorInput);
canvas.on('selection:updated', toggleShapeColorInput);
canvas.on('selection:cleared', toggleShapeColorInput);
document.getElementById('shapeColor').addEventListener('input', setShapeColor);


// Function: Delete objects
function deleteObjects(){
    canvas.getActiveObjects().forEach((obj) => {
        canvas.remove(obj)
      });
      canvas.discardActiveObject().renderAll()
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Delete') {
        deleteObjects()
    }
})



//  !   Section: Highlight layer
// Function to highlight the active layer
function highlightActiveLayer(activeIndex) { 
    const layerList = document.getElementById('layerList'); 
    const layers = layerList.getElementsByTagName('li'); 

    // Remove highlight from all layers 
    Array.from(layers).forEach((layer, index) => { 
        // Highlight the active layer based on reverse index 
        layer.style.backgroundColor = index === (layers.length - 1 - activeIndex) ? '#d3d3d3' : ''; 
    }); 
}


// Function: Update the layer list
function updateLayerList() { 
    const layerList = document.getElementById('layerList'); 

    if (!layerList) { 
        console.error("Layer list element not found! "); 

        // Exit the function if the layer list is not found 
        return; 
    } 

    // Clear the current list 
    layerList.innerHTML = ''; 

    // Get all objects on the canvas 
    const objects = canvas.getObjects(); 

    // Create a list item for each object in reverse order 
    for (let index = objects.length - 1; index >= 0; index--) { 
        const obj = objects[index]; 
        const li = document.createElement('li'); 
        li.textContent = `Layer ${index + 1}: ${obj.type}`; 

        // Store the index for later use 
        li.dataset.index = index; 

        // Add click event to select the object on the canvas 
        li.addEventListener('click', (e) => { 
            // Prevent the event from bubbling up 
            e.stopPropagation(); 
            canvas.setActiveObject(obj); 
            canvas.renderAll(); 

            // Highlight the selected layer 
            highlightActiveLayer(index); 
        }); 

        // Add a line break after the layer name 
        li.appendChild(document.createElement('br')); // Insert a line break 


        // Create buttons for layer actions
        const visibilityBtn = document.createElement('button');

        // Optionally set an ID for the button
        visibilityBtn.id = 'btnVisibility'; 

        // Create the image for the visibility button
        const visibilityImg = document.createElement('img');

        // Set the initial image based on visibility
        visibilityImg.src = obj.visible ? '/media/close-eye.png' : '/media/witness.png'; 

        // Add the "icon" class for styling
        visibilityImg.classList.add('icon'); 

        // Set an alt text for accessibility
        visibilityImg.alt = obj.visible ? 'Hide Icon' : 'Show Icon'; 

        // Append the image to the button
        visibilityBtn.appendChild(visibilityImg);

        // Add click event to toggle visibility
        visibilityBtn.addEventListener('click', (e) => {
            // Prevent the list item click event
            e.stopPropagation(); 

            // Toggle visibility
            obj.visible = !obj.visible; 

            // Update the image source and alt text based on visibility state
            visibilityImg.src = obj.visible ? '/media/close-eye.png' : '/media/witness.png'; // Switch image

            // Update alt text
            visibilityImg.alt = obj.visible ? 'Hide Icon' : 'Show Icon'; 

            // Re-render the canvas
            canvas.renderAll(); 
        });

        // Append the button to the list item
        li.appendChild(visibilityBtn);

        // Create the remove button
        const removeBtn = document.createElement('button');

        // Optionally set an ID for the button
        removeBtn.id = 'btnRemove'; 

        // Create the image for the remove button
        const removeImg = document.createElement('img');

        // Set the source of the trash icon
        removeImg.src = '/media/trash.png'; 
        removeImg.classList.add('icon');

        // Set an alt text for accessibility
        removeImg.alt = 'Remove Icon'; 

        // Append the image to the button
        removeBtn.appendChild(removeImg);

        // Add click event to remove the object from the canvas
        removeBtn.addEventListener('click', (e) => {
            // Prevent the list item click event
            e.stopPropagation(); 

            // Remove the object from the canvas
            canvas.remove(obj); 

            // Update the layer list after removing
            updateLayerList(); 
        });

        // Append the button to the list item
        li.appendChild(removeBtn);

        // Create the up button
        const upBtn = document.createElement('button');
        upBtn.id = 'btnUp'; // Optionally set an ID for the button

        // Create the image for the up button
        const upImg = document.createElement('img');

        // Set the source of the up arrow icon
        upImg.src = '/media/up-arrow.png'; 

        // Add the "icon" class for styling
        upImg.classList.add('icon'); 

        // Set an alt text for accessibility
        upImg.alt = 'Move Up Icon'; 

        // Append the image to the button
        upBtn.appendChild(upImg);

        // Add click event to move the object up
        upBtn.addEventListener('click', (e) => {
            // Prevent the list item click event
            e.stopPropagation(); 

            if (index < objects.length - 1) {
                // Swap the current object with the one above it
                const currentObject = objects[index];
                const nextObject = objects[index + 1];
                canvas.remove(currentObject);

                // Move it up
                canvas.insertAt(currentObject, index + 1); 

                // Update the layer list after changing order
                updateLayerList(); 
            }
        });

        // Append the up button to the list item
        li.appendChild(upBtn);

        // Create the down button
        const downBtn = document.createElement('button');

        // Optionally set an ID for the button
        downBtn.id = 'btnDown'; 

        // Create the image for the down button
        const downImg = document.createElement('img');

        // Set the source of the down arrow icon
        downImg.src = '/media/down-arrow.png'; 

        // Add the "icon" class for styling
        downImg.classList.add('icon'); 

        // Set an alt text for accessibility
        downImg.alt = 'Move Down Icon'; 

        // Append the image to the button
        downBtn.appendChild(downImg);

        // Add click event to move the object down
        downBtn.addEventListener('click', (e) => {
            // Prevent the list item click event
            e.stopPropagation(); 

            if (index > 0) {
                // Swap the current object with the one below it
                const currentObject = objects[index];
                const previousObject = objects[index - 1];
                canvas.remove(currentObject);

                // Move it down
                canvas.insertAt(currentObject, index - 1); 

                // Update the layer list after changing order
                updateLayerList(); 
            }
        });

        // Append the down button to the list item
        li.appendChild(downBtn); 

        // Append buttons to the list item
        li.appendChild(visibilityBtn);
        li.appendChild(removeBtn);
        li.appendChild(upBtn);
        li.appendChild(downBtn);

        // Append the list item to the layer list
        layerList.appendChild(li); 
    }
}

// Call updateLayerList whenever an object is added or removed
canvas.on('object:added', updateLayerList);
canvas.on('object:removed', updateLayerList);

// Listener: Selection events on the canvas
canvas.on('selection:created', (e) => {
    // Get the selected object
    const selectedObject = e.target; 

    // Get all objects on the canvas
    const objects = canvas.getObjects(); 

    // Calculate the corresponding index in reverse order
    const index = objects.length - 1 - objects.indexOf(selectedObject); 

    // Highlight the corresponding layer
    highlightActiveLayer(index); 
});

canvas.on('selection:updated', (e) => {
    // Get the selected object
    const selectedObject = e.target; 

    // Get all objects on the canvas
    const objects = canvas.getObjects(); 

    // Calculate the corresponding index in reverse order
    const index = objects.length - 1 - objects.indexOf(selectedObject); 

    // Highlight the corresponding layer
    highlightActiveLayer(index); 
});

canvas.on('selection:cleared', () => {
    // Remove highlight from all layers
    highlightActiveLayer(-1); 
});

// Call updateLayerList initially to populate the layer list
updateLayerList();

document.addEventListener('DOMContentLoaded', function () {
    // Your existing code here
    const canvas = initCanvas('canvas'); // Initialize canvas
    updateLayerList(); // Populate layer list
});
