$(document).ready(function() {
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
                                            <p class="lead" id="lead'+(i+1)+'">' + data.qns[i].content + '</p>\
                                            <div class="choiceContainer">\
                                                <form class="formChoices">\
                                                    <input type="radio" id="radioFirstChoice" name="choice" class="choiceLeft" value="1stradiovalue">hello\
                                                    <input type="radio" id="radioSecondChoice" name="choice" class="choiceRight" value="2ndradiovalue">hello\
                                                    <input type="radio" id="radioThirdChoice" name="choice" class="choiceLeft" value="3rdradiovalue">hello\
                                                    <input type="radio" id="radioFourthChoice" name="choice" class="choiceRight" value="4thradiovalue">hello\
                                                </form>\
                                            </div>\
                                            <footer id="foot"> '+ tagsText +'\
                                            </footer>\
                                        </div>\
                                        <div class="formSubmitBox">\
                                            <input type="text"  class="inputAutoFill">\
                                            <button type="button" class="btnSubmit">submit</button>\
                                        </div>\
                                    </div>\
                                </div>';
                
                $('#main').append(html_text);
                
                i++;
                tagsText = "";
            });
            
        });
    }
    
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
        var gifLoad = '<img class="gifLoading" src="img/newload.gif" height="20px" width="20px">';
        $(this).append(gifLoad);
        
        setTimeout(function() {
            $('.gifLoading').remove();
            setTimeout(function() {
                $.notify("Update Successful!","success");
            },100);
        }, 3000);
        
        
    });
    
    //trigger this function by clicking on any question to display its contents in right container 
    $('body').on('click','.lead', function() {
        var oldQuestion = $(this).html();
        var questionId = $(this).attr("id");
        $('#questionEditor').attr('questionFrom',questionId);
        $('#questionEditor').html(oldQuestion);
        
        var oldOption1 = $(this).next().find("#radioFirstChoice").val();
        var radioOption1Id = $(this).next().find("#radioFirstChoice").attr("id");
        $('#txtFirstChoice').attr('choiceFrom', radioOption1Id);
        $('#txtFirstChoice').html(oldOption1);
        
        var oldOption2 = $(this).next().find("#radioSecondChoice").val();
        var radioOption2Id = $(this).next().find("#radioSecondChoice").attr("id");
        $('#txtSecondChoice').attr('choiceFrom', radioOption2Id);
        $('#txtSecondChoice').html(oldOption2);
        
        var oldOption3 = $(this).next().find("#radioThirdChoice").val();
        var radioOption3Id = $(this).next().find("#radioThirdChoice").attr("id");
        $('#txtThirdChoice').attr('choiceFrom', radioOption3Id);
        $('#txtThirdChoice').html(oldOption3);
        
        var oldOption4 = $(this).next().find("#radioFourthChoice").val();
        var radioOption4Id = $(this).next().find("#radioFourthChoice").attr("id");
        $('#txtFourthChoice').attr('choiceFrom', radioOption4Id);
        $('#txtFourthChoice').html(oldOption4);
        
        $('.formEditBox').removeClass('hidden').css('border','solid 1px #aaa');
        
        $('.boxItem2').removeClass('hidden');
        $('.boxItem2').show();
        $('.ckeditor').hide();
        
        
    });
    
    
    //submit the edited question and options back to left container
    $('body').on('click','#btnSubmitEditedQuestion', function() {
        var editedQuestion = $('#questionEditor').html();
        var editedChoice1 = $('#txtFirstChoice').val();
        var editedChoice2 = $('#txtSecondChoice').val();
        var editedChoice3 = $('#txtThirdChoice').val();
        var editedChoice4 = $('#txtFourthChoice').val();
        var returnEditedQuestionTo = $('#questionEditor').attr("questionFrom");
        var returnChoice1To = $('#txtFirstChoice').attr("choiceFrom");
        var returnChoice2To = $('#txtSecondChoice').attr("choiceFrom");
        var returnChoice3To = $('#txtThirdChoice').attr("choiceFrom");
        var returnChoice4To = $('#txtFourthChoice').attr("choiceFrom");
        $("#" +returnEditedQuestionTo+ "").html(editedQuestion);
        $("#" +returnChoice1To + "").val(editedChoice1);
        $("#" +returnChoice2To + "").val(editedChoice2);
        $("#" +returnChoice3To + "").val(editedChoice3);
        $("#" +returnChoice4To + "").val(editedChoice4);
        $('#questionEditor').html("");
        $('#txtFirstChoice').val("");
        $('#txtSecondChoice').val("");
        $('#txtThirdChoice').val("");
        $('#txtFourthChoice').val("");
        
        
    });
    
    $('#editor').ckeditor();
    
    $('body').on('click','.rightContainerContent', function() {
        var toEdit = $(this).html();
        var returnId = $(this).attr('id');
        $('#editor').attr('sendBackTo', returnId);
        $('.formEditBox').hide();
        $('#editor').val(toEdit);
        $('.ckeditor').show();
    });
    
    $('body').on('click','#applyUpdate', function() {
        var updatedText = $('#editor').val();
        var returnUpdateTo = $('#editor').attr('sendBackTo');
        $("#" + returnUpdateTo + "").html(updatedText);
        var ex = $("#" + returnUpdateTo + "").html();
        alert(ex);
        $('.ckeditor').hide();
        $('.formEditBox').show();
        updatedText = "";
    });
    
    $('body').on('click','#cancelUpdate', function() {
        $('.ckeditor').hide();
        $('.formEditBox').show();
    });
    
});
