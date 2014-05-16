// Instance variables
var current_tile;
var current_cell;

var make_tray_tiles_draggable = function() {
  return $('#tray .tile').draggable({
    revert: 'invalid' });
};

var make_cells_droppable = function() {
  var cells = $('td.cell');
  $.each(cells, function(index, cell) {
    if ($(cell).children().length == 0) {
      $(cell).droppable({
        drop: function() {
          $(current_tile).css( {left: '0px', top: '0px'} );
          $(current_tile).detach().appendTo(this);
          $(this).droppable('disable');
          var cellstring = this.id;
          var coord = cellstring.match(/\d{1,2}x\d{1,2}/)[0];
          var coord = coord.split("x");
          var x = parseInt(coord[0]);
          var y = parseInt(coord[1]);
          activateSquares(x , y);
        }
      });
      $(this).droppable('disable');
    }
  });
  $("#cell_7x7").droppable('enable');
};

function activateSquares(x, y){
  var box1 = "#cell_" + (x + 1) + "x" + y;
  var box2 = "#cell_" + (x - 1) + "x" + y;
  var box3 = "#cell_" + x + "x" + (y + 1);
  var box4 = "#cell_" + x + "x" + (y - 1);

  $(box1).droppable('enable');
  $(box2).droppable('enable');
  $(box3).droppable('enable');
  $(box4).droppable('enable');
}


var on_tile_grab = function(f) { $('.tile').on( 'mousedown', f ) };
var define_current_tile = function(e) {
  current_tile = $(this)[0];
  $(current_tile).parent().droppable({
    drop: function() {
      $(current_tile).css( {left: '0px', top: '0px'} );
      $(current_tile).detach().appendTo(this);
    }
  });
  $(current_tile).parent().droppable('enable');
};

// SHUFFLE LETTERS - TO BE BUILT LATER
var on_click_shuffle = function(f) {$("#shuffle").on("click", f)};
var shuffle_tiles = function(e) {
  e.preventDefault();
}

// RESET LETTERS
var on_click_reset = function(f) {$("#reset").on("click", f)};
var reset_tray = function(e) {
  e.preventDefault();
  var unplaced_tiles = $('div.tile.ui-draggable');
  var tray_cells = $("#tray tr").children();
  $.each(unplaced_tiles, function(index, tile) {
    var cell = tray_cells[index];
    $(tile).detach().appendTo($(cell));
  });
  make_cells_droppable();
}



$(function() {
  make_tray_tiles_draggable();
  make_cells_droppable();
  on_tile_grab( define_current_tile );
  on_click_shuffle( shuffle_tiles );
  on_click_reset( reset_tray );
});
