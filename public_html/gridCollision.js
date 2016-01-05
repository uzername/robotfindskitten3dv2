//define set of rectangles on area. Track down movement of character. 
//If the character is going to collide with some rectangle, then provide a linked UUID
function collisionPlanarRecord(inpTopLeftHorizontal, inpTopLeftVertical, inpBottomRightHorizontal, inpBottomRightVertical, inpID, inpX, inpY) {
    this.topLeftHorizontal=inpTopLeftHorizontal;
    this.topLeftVertical=inpTopLeftVertical;
    this.bottomRightHorizontal=inpBottomRightHorizontal;
    this.bottomRightVertical=inpBottomRightVertical;
    this.intX=inpX;
    this.intY=inpY;
    this.meshID=inpID;
    this.testCollide = function(inpHorizontalPoint, inpVerticalPoint) {
        var testCollisionRes=false;
        if  ( ((this.topLeftHorizontal<=inpHorizontalPoint)&&(this.bottomRightHorizontal>=inpHorizontalPoint)) &&
             ((this.topLeftVertical<=inpVerticalPoint)&&(this.bottomRightVertical>=inpVerticalPoint))
            ) {
                testCollisionRes=true;
            }
        if (testCollisionRes === true) {
            return this.meshID;
        } else {
            return null;
        }
    };
}

var allCollisionsArray = [];