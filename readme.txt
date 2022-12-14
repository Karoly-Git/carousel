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
        |__ favicon.jpg
        |__ index.html
        |__ readme.txt


B)  HOW TO SETUP:

    1.  Copy the 'carousel' folder to your project.

    2.  There are 5 template images in the 'img' folder.
        Delete those files and add your own images.
        Minimum 3 images must be in the folder. No maximum limit. 
        All images must have the same aspect ratio!
        Each image extension should be 'jpg'!
        Rename the files to 'img1.jpg', 'img2.jpg', 'img3.jpg', and so on...
    
    3.  Add the following script to the end of the body in the HTML file.
        Make sure the 'src' points to the 'carousel.js' with the correct path.
        <script type="module" src="./carousel.js"></script>
        
    4.  Add the following css link to the head of the HTML file.
        <link rel="stylesheet" href="./carousel.css" />
    
    5.  Add the following div tag to the HTML file.
        <div class="carousel"></div>

    6.  Specify the following parameters in the 'carousel.css' file:

        :root {
            --carousel-width:   Carousel with, % of the view width.
            --aspec-ratio:      Image aspect ratio, 'height / width'.
                                All images should have the same aspect ratio!
        }

    7.  Specify the following parameters in the 'config.js' file:

        let config = {
            numOfSlides:        Number of files are in the 'img' folder.
            slidingTime:        Carousel sliding time in milliseconds.
            timeGap:            Time gap (waiting time) between slides in milliseconds.
        }




    
