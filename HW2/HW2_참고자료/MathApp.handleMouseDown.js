MathApp.handleMouseDown = function(window_p) {
    if(MathApp.isInCanvas(window_p))
    {
        let canvas_p = MathApp.transformToCanvasCoords(window_p);
        let preSelected_block = null;

        if( MathApp.selected_block != null )
        {
            //preSelected_block = MathApp.selected_block;
            MathApp.selected_block.onDeselected();
            MathApp.selected_block = null;
        }

        let block = MathApp.findBlockOn(canvas_p);
        if(block != null)
        {
            if(MathApp.popup_list.includes(block.name))
            {
                if(preSelected_block != null)
                {
                    console.log("이거 사용됨 : " + block.name);
                    console.log("이거 사용됨 : " + preSelected_block.name);
                    //MathApp.selectPopup(preSelected_block, block);
                }
            }
            else{
                //MathApp.deletePopup();
                //MathApp.createPopup(block);
                MathApp.selected_block = block;
                MathApp.selected_block.onSelected();
            }
        }
        else{
            //MathApp.deletePopup();
        }

        MathApp.is_mouse_dragging = true;
        MathApp.mouse_drag_prev = canvas_p;

        MathApp.canvas.requestRenderAll();
    }
    else
    {
        //MathApp.deletePopup();
        MathApp.is_mouse_dragging = false;
        MathApp.mouse_drag_prev = {x:0, y:0};
    }
}