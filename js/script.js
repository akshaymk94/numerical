$(document).ready(function() {
    var i=0;
    var j=0;
    var autoFillContent;
    var titles=[];
    var tagsText = "";
  
    function questionRenderer() {
        $.getJSON('json/qui.json', function(data) {
    
            var i = 0;
            $.each(data, function(index, info) {
                
                
                var tempo = data.qns[i]["sasts"];
                $.each(tempo, function(index, value) {
                    tagsText += '<span class="tags">' + value["title"] + '<span collect-id="'+ value["id"] +'" class="glyphicon glyphicon-remove"></span>\
                                    </span>'
                    
                });
                
                
                var html_text = '<div class="box">\
                                    <div class="boxItem1">\
                                        <div class="questionContainer">\
                                            <header>\
                                                <label id="boxLabel'+(i+1)+'">' + data.qns[i].u_id + '</label>\
                                            </header>\
                                            <p class="lead">' + data.qns[i].content + '</p>\
                                            <footer id="foot"> '+ tagsText +'\
                                                \
                                            </footer>\
                                        </div>\
                                        <div class="formSubmitBox">\
                                            <input type="text"  class="inputAutoFill">\
                                            <button type="submit" class="btnSubmit">submit</button>\
                                        </div>\
                                    </div>\
                                    <div class="boxItem2">\
                                    </div>\
                                </div>'
                $('#main').append(html_text);
                
                i++;
                tagsText = "";
            });
            
        });
    }
    
    //display id of tag value on closing the tag
    
    $('body').on('click','.glyphicon-remove', function() {
        var collectedId = $(this).attr('collect-id');
        alert(collectedId);
    });
    
    questionRenderer();
        
    
    function getSastTags() {
        $.getJSON('json/sasts.json', function(autoFillContent) {
        var temp = autoFillContent["sast_ids"];
        
        for(var ind = 0; ind < temp.length; ind++) {
            var obj = {}
            obj["label"] = temp[ind]["title"]
            obj["id"] = temp[ind]["id"]
            obj["value"] = temp[ind]["title"]
            titles.push(obj);
        }
         }); 
    }
    
    getSastTags();
      
    //autocomplete the input on click
    $('body').on('click','.inputAutoFill',function(){
        $(this).autocomplete({
            source: titles,
            select:function(event,ui){
                alert(ui.item.id)
                
            }
        });        
    })
    
    //submit the selected tag to backend
    $('body').on('click','.btnSubmit', function() {
        /*var showAutoFillId = $(this).attr("#" +collect-autoFull-id + "");
        alert(showAutoFillId);*/
        var gifLoad = '<img class="gifLoading" src="img/newload.gif" height="20px" width="20px">';
        $(this).append(gifLoad);
        
        setTimeout(function() {
            $('.gifLoading').remove();
            setTimeout(function() {
                $.notify("Update Successful!","success");
            },100);
        }, 3000);
        
        
    });
    
    
    
});
