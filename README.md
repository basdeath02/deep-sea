# Deep Sea Dive - Interactive Scrolling Journey

This project is an interactive vertical-scrolling web page that simulates a deep-sea diving journey. As the user scrolls downward, the page displays different ocean layers, marine creatures, and fun facts corresponding to the depth.

## Features

- **Vertical Scrolling Experience**: Simulates a descent into the ocean.
- **Dynamic Content**: Ocean layers, marine creatures, and fun facts appear as you scroll.
- **Depth Marker**: A fixed marker displays your current simulated depth.
- **Darkening Background Gradient**: The background color changes from light blue to deep black as you "dive" deeper.
- **Subtle Background Animation**: A lightweight canvas animation provides a sense of ocean movement (e.g., rising particles).
- **Responsive Design**: Adapts to both desktop and mobile screen sizes.
- **Minimal UI**: Focuses on the visual experience.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- HTML5 Canvas API (for background animation)

## How to Run Locally

1.  **Clone the repository (or download the files):**
    ```bash
    git clone <repository_url>
    ```
    (If you downloaded the files as a ZIP, extract them to a folder.)

2.  **Navigate to the project directory:**
    ```bash
    cd <project_directory_name>
    ```

3.  **Open `index.html` in your web browser:**
    - You can usually do this by double-clicking the `index.html` file.
    - Alternatively, right-click the `index.html` file and choose "Open with" your preferred web browser.
    - For the best experience, use a modern web browser that supports HTML5, CSS3, and JavaScript ES6 features.

No special build steps or local server is strictly necessary to view this project, as it's built with static HTML, CSS, and JavaScript files.

## Project Structure

-   `index.html`: The main HTML file containing the structure of the page.
-   `style.css`: Contains all the styles for the page, including layout, responsiveness, and color gradients.
-   `script.js`: Handles the dynamic aspects of the page, such as scroll tracking, depth calculation, content updates, and background color transitions.
-   `background.js`: Powers the HTML5 canvas animation for the subtle ocean background movement.
-   `README.md`: This file.

## Customization

-   **Content**: To change the creatures or fun facts, edit the `data-creatures` and `data-facts` attributes within the `<section>` elements in `index.html`.
-   **Styling**: Modify `style.css` to change the visual appearance.
-   **Animation**: Adjust parameters in `background.js` to alter the particle animation (density, speed, color).
-   **Depth Zones**: The depths and names of ocean zones can be modified in `index.html` (both in the text and `data-depth` attributes) and `script.js` (the `MAX_DEPTH` constant and potentially color transition logic if zones are drastically changed).

Enjoy your dive!
