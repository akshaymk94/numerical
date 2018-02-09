$(document).ready(function() {
    
    var num = 0;
    var question = 0;
    var answer = 0;
    var explanation = 0;
    var textarea = 0;
    var edit = 0;
    var noOfEditors = 0;
    var saveQuestions=[];
    
    
    
    function getQuestions() {
        
        
        $.getJSON('json/info.json', function(data) {
            
            var tempo = data["question_details"]; 

            for(var i = 0; i < tempo.length; i++) {
                var obj = {}
                obj["qn_id"] = tempo[i]["qn_id"]
                obj["qn_content"] = tempo[i]["qn_content"]
                obj["ans_id"] = tempo[i]["ans_id"]
                obj["ans_content"] = tempo[i]["ans_content"]
                obj["soln_id"] = tempo[i]["soln_id"]
                obj["soln_content"] = tempo[i]["soln_content"]
                saveQuestions.push(obj);
            }
            questionRenderer();
        });
    }
    
    getQuestions();
    
    function questionRenderer() {
        
        $.each(saveQuestions, function(index, value) {
            var mynewbox = '<div class="container box" id="box'+(num + 1)+'">\
                                    <div class="glyphicon glyphicon-remove" toRemove="box'+(num + 1)+'"></div>\
                                    <div class="rendererBox">\
                                        <div class="questionRenderer questionContent" id="question'+(question+1)+'" boxId="box'+(num + 1)+'">\
                                            <span class="iconAdd hidden">&plus;</span>\
                                            <strong class="question" parentId="question'+(question+1)+'">'+ value["qn_content"] +'</strong>\
                                        </div>\
                                        <div class="answerRenderer questionContent" id="answer'+(answer+1)+'" boxId="box'+(num + 1)+'">\
                                            <span class="iconAdd hidden">&plus;</span>\
                                            <strong class="answer" parentId="answer'+(answer+1)+'">'+ value["ans_content"] +'</strong>\
                                        </div>\
                                        <button type="button" class="btn btn-info btnSolution" explanationId="explanation'+(explanation+1)+'" boxId="box'+(num + 1)+'">view explanation</button>\
                                        <div class="explanationRenderer questionContent hidden" id="explanation'+(explanation+1)+'" boxId="box'+(num + 1)+'">\
                                            <span class="iconAdd hidden">&plus;</span>\
                                            <strong class="explanation" parentId="explanation'+(explanation+1)+'">'+ value["soln_content"] +'</strong>\
                                        </div>\
                                    </div>\
                                </div>';

                $('#QandAContainer').append(mynewbox);

                num++;
                question++;
                answer++;
                explanation++;
            });
        }
    
    
    
    $('body').on('click','#addQandABox', function() {
        var mynewbox = '<div class="container box" id="box'+(num + 1)+'">\
                                    <div class="glyphicon glyphicon-remove" toRemove="box'+(num + 1)+'"></div>\
                                    <div class="rendererBox">\
                                        <div class="questionRenderer questionContent" id="question'+(question+1)+'">\
                                            <span class="iconAdd">&plus;</span>\
                                            <strong class="question" parentId="question'+(question+1)+'" boxId="box'+(num + 1)+'">Question</strong>\
                                        </div>\
                                        <div class="answerRenderer questionContent hidden" id="answer'+(answer+1)+'">\
                                            <span class="iconAdd">&plus;</span>\
                                            <strong class="answer" parentId="answer'+(answer+1)+'" boxId="box'+(num + 1)+'">Answer</strong>\
                                        </div>\
                                        <button type="button" class="btn btn-info btnSolution hidden" explanationId="explanation'+(explanation+1)+'" boxId="box'+(num + 1)+'">view explanation</button>\
                                        <div class="explanationRenderer questionContent hidden" id="explanation'+(explanation+1)+'">\
                                            <span class="iconAdd">&plus;</span>\
                                            <strong class="explanation" parentId="explanation'+(explanation+1)+'" boxId="box'+(num + 1)+'">Explanation</strong>\
                                        </div>\
                                    </div>\
                                </div>';

                $('#QandAContainer').prepend(mynewbox);

                num++;
                question++;
                answer++;
                explanation++;
    });
    
    $('body').on('click','.glyphicon-remove', function() {
        var elementToRemove = $(this).attr('toRemove');
        $("#" + elementToRemove + "").remove();
    });
    
    $('body').on('click','.questionContent strong', function() {
        if(!(noOfEditors > 0)) {
            noOfEditors++;
            var editableText = $(this).html();
            $(this).hide();
            var sendBackTo = $(this).attr('parentId');
            var rootBox = $(this).attr('boxId');
            var replaceElement = '<div id="editor'+(edit + 1)+'">\
                                        <textarea id="editArea"  rows="5" cols="30" editorId="editor'+(edit + 1)+'">' + editableText + '</textarea>\
                                        <button type="button" class="btn btn-success btnApply" textAreaId="editArea" editorId="editor'+(edit + 1)+'" sendBackTo="'+ sendBackTo +'" rootParent="'+ rootBox +'">Apply</button>\
                                        <button type="button" class="btn btn-warning btnCancel" editorId="editor'+(edit + 1)+'" sendBackTo="'+ sendBackTo +'">Cancel</button>\
                                  </div>';
            $("#" + sendBackTo + "").append(replaceElement);
            /*$("#editArea").focus();*/
            $("#" + sendBackTo + "").find('.iconAdd').hide();
            $(this).hide();

            var ckeditor = CKEDITOR.replace( "editArea", {
                extraPlugins: 'mathjax',
                mathJaxLib: 'http://cdn.mathjax.org/mathjax/2.6-latest/MathJax.js?config=TeX-AMS_HTML',
                height: 150,
                filebrowserUploadUrl: '/ckeditor/img_upload/'
            });

            /*$('body').on('blur', '#editArea', function() {
                alert();
                var editorid = $(this).attr('editorId');
                $("#" + editorid + "").remove();
            });*/


            textarea++;
            edit++;    
        }
        else {
            $(this).notify("Close any existing editors to carryout Updation.","error");
        }
    });
    
    
    
    
    
    $('body').on('click','.btnApply', function() {
        var sendBackTo = $(this).attr('sendBackTo');
        var rootBox = $(this).attr('rootParent');
       /* var hasQuestion = $("#"+sendBackTo+"").hasClass('.questionRenderer');
        var answerHidden = $("#"+rootBox+"").find('.answerRenderer').hasClass('hidden');*/
        /*var textareaId = $(this).attr('textAreaId');*/
        var editorId = $(this).attr('editorId');
        var editedText =  CKEDITOR.instances.editArea.getData();
        if(editedText == "<p>Question</p>") {
            $("#" + sendBackTo + "").find('.iconAdd').show();
        }
        $("#" + sendBackTo + "").find('strong').html(editedText).show();
        $("#" + editorId + "").remove();
        noOfEditors--;
        
        /*$(this).next().removeClass("hidden");*/
        
        /*alert(noOfEditors);
        
        if(hasQuestion && answerHidden) {
            alert();
            $("#" + rootBox + "").find('.answerRenderer').removeClass('hidden');
        }*/
    });
    
    $('body').on('click','.btnCancel', function() {
        var editorId = $(this).attr('editorId');
        var sendBackTo = $(this).attr('sendBackTo');
        if(($("#editArea").text() == "Question") || ($("#"+editorId+"").text() == "Answer") || ($("#"+editorId+"").text() == "Explanation"))
        {    
            $("#" + sendBackTo + "").find('.iconAdd').show();
        }
        $("#" + sendBackTo + "").find('strong').show();
        $("#" + editorId + "").remove();
        noOfEditors--;
    });
    
    $('body').on('click','.btnSolution', function() {
        var toggleDiv = $(this).attr('explanationId');
        $("#" + toggleDiv + "").removeClass('hidden');
        $("#" + toggleDiv + "").slideToggle("fast");
        $(this).text($(this).text() == "view explanation"?"hide explanation":"view explanation");
        
        
    });
    
    
    
});