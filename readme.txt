A)  FOLDER STRUCTURE:

    carousel
        |__ img
        |   |__ img1.jpg
        |   |__ img2.jpg
        |   |__ img3.jpg
        |   |__ img4.jpg
        |   |__ img5.jpg
        |
        |__ carousel.css
        |__ carousel.js
        |__ config.js
        |__ index.html
        |__ readme.txt


B)  HOW TO SETUP:

    1.  Copy the 'carousel' folder to your project.

    2.  There are 5 template images in the 'img' folder.
        Delete those files and add your own images.
        Minimum 3 images must be in the folder. No maximum limit. 
        All images should have the same aspect ratio!
        Each image extension should be 'jpg'!
        Rename the files to 'img1.jpg', 'img2.jpg', 'img3.jpg', and so on...
    
    3.  Add this script to the head of the html:
            <script type="module" defer src="./carousel.js"></script>
        Make sure the 'src' points to the 'carousel.js' with the correct path.

    4.  Add this css link to the head of the html:
            <link rel="stylesheet" href="./carousel.css" />
    
    5.  Add this div tag to your html:
            <div class="carousel"></div>

    6.  Specify the following parameters in the 'config.js' file:

            slidingTime:    Carousel rotation (sliding) time in milliseconds. (It's set to 1500 by default.)

            timeGap:        Time gap (waiting time) between slides in milliseconds. (It's set to 4000 by default.)
            
            carouselWidth:  Carousel width, % of the parent element.
            
            aspectRatio:    Image aspect ratio, 'height / width'.
                            All images should have the same aspect ratio!
            
            numOfSlides:    Number of files are in the 'img' folder.



    
