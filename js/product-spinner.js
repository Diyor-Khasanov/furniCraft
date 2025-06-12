class ProductSpinner {
  constructor(container) {
    this.container = container;
    this.spinner = container.querySelector(".spinner-axis");
    this.spinLeft = container.querySelector(".spin-left");
    this.spinRight = container.querySelector(".spin-right");
    this.currentAngle = 0;
    this.isDragging = false;
    this.startX = 0;
    this.startAngle = 0;
    this.imageCount = 36; // Number of images in 360 sequence
    this.imagePrefix = "images/product-360/";
    this.imageExtension = ".jpg";

    this.init();
  }

  init() {
    // Button controls
    this.spinLeft.addEventListener("click", () => {
      this.currentAngle -= 10;
      this.updateSpinner();
    });

    this.spinRight.addEventListener("click", () => {
      this.currentAngle += 10;
      this.updateSpinner();
    });

    // Touch events for mobile
    this.spinner.addEventListener(
      "touchstart",
      this.handleTouchStart.bind(this)
    );
    this.spinner.addEventListener("touchmove", this.handleTouchMove.bind(this));
    this.spinner.addEventListener("touchend", this.handleTouchEnd.bind(this));

    // Mouse events for desktop
    this.spinner.addEventListener("mousedown", this.handleMouseDown.bind(this));
    document.addEventListener("mousemove", this.handleMouseMove.bind(this));
    document.addEventListener("mouseup", this.handleMouseUp.bind(this));
  }

  handleTouchStart(e) {
    this.isDragging = true;
    this.startX = e.touches[0].clientX;
    this.startAngle = this.currentAngle;
    e.preventDefault();
  }

  handleTouchMove(e) {
    if (!this.isDragging) return;
    const deltaX = e.touches[0].clientX - this.startX;
    this.currentAngle = this.startAngle + deltaX * 0.5;
    this.updateSpinner();
  }

  handleTouchEnd() {
    this.isDragging = false;
  }

  handleMouseDown(e) {
    this.isDragging = true;
    this.startX = e.clientX;
    this.startAngle = this.currentAngle;
    e.preventDefault();
  }

  handleMouseMove(e) {
    if (!this.isDragging) return;
    const deltaX = e.clientX - this.startX;
    this.currentAngle = this.startAngle + deltaX * 0.5;
    this.updateSpinner();
  }

  handleMouseUp() {
    this.isDragging = false;
  }

  updateSpinner() {
    // Calculate frame number (0-35)
    let frame = Math.round((this.currentAngle % 360) / 10);
    frame = frame < 0 ? frame + 36 : frame;
    const imageNum = (frame % 36) + 1;

    // Update spinner rotation
    this.spinner.style.transform = `rotateY(${this.currentAngle}deg)`;

    // Update image source
    const imageNumStr = imageNum.toString().padStart(2, "0");
    this.spinner.querySelector(
      "img"
    ).src = `${this.imagePrefix}${imageNumStr}${this.imageExtension}`;
  }
}

// Initialize all product spinners on the page
document.addEventListener("DOMContentLoaded", () => {
  const spinners = document.querySelectorAll(".product-viewer");
  spinners.forEach((container) => {
    new ProductSpinner(container);
  });
});
