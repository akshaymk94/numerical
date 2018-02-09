$(document).ready(function() {
    
    var num = 0;
    var question = 0;
    var answer = 0;
    var explanation = 0;
    var textarea = 0;
    var edit = 0;
    
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
        });
    }
    
    getQuestions();
    
    function questionRenderer() {
        
        $.each(saveQuestions, function(index, value) {
                var mynewbox = '<div class="container box" id="box'+(num + 1)+'">\
                                    <div class="glyphicon glyphicon-remove" toRemove="box'+(num + 1)+'"></div>\
                                    <div class="rendererBox">\
                                        <div class="questionRenderer questionContent" id="question'+(question+1)+'">\
                                            <span class="iconAdd">&plus;</span>\
                                            <strong class="question" parentId="question'+(question+1)+'">Question</strong>\
                                        </div>\
                                        <div class="answerRenderer questionContent" id="answer'+(answer+1)+'">\
                                            <span class="iconAdd">&plus;</span>\
                                            <strong class="answer" parentId="answer'+(answer+1)+'">Answer</strong>\
                                        </div>\
                                        <div class="explanationRenderer questionContent" id="explanation'+(explanation+1)+'">\
                                            <span class="iconAdd">&plus;</span>\
                                            <strong class="explanation" parentId="explanation'+(explanation+1)+'">Explanation</strong>\
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
    
    questionRenderer();
    
    
    
    $('body').on('click','#addQandABox', function() {
        var QandABox = '<div class="container box" id="box'+(num + 1)+'">\
                            <div class="glyphicon glyphicon-remove" toRemove="box'+(num + 1)+'"></div>\
                            <div class="rendererBox">\
                                <div class="questionRenderer questionContent" id="question'+(question+1)+'">\
                                    <span class="iconAdd">&plus;</span>\
                                    <strong class="question" parentId="question'+(question+1)+'">Question</strong>\
                                </div>\
                                <div class="answerRenderer questionContent hidden" id="answer'+(answer+1)+'">\
                                    <span class="iconAdd">&plus;</span>\
                                    <strong class="answer" parentId="answer'+(answer+1)+'">Answer</strong>\
                                </div>\
                                <div class="explanationRenderer questionContent hidden" id="explanation'+(explanation+1)+'">\
                                    <span class="iconAdd">&plus;</span>\
                                    <strong class="explanation" parentId="explanation'+(explanation+1)+'">Explanation</strong>\
                                </div>\
                            </div>\
                        </div>';
        $('#QandAContainer').prepend(QandABox);
        
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
        var editableText = $(this).html();
        $(this).hide();
        var sendBackTo = $(this).attr('parentId');
        var replaceElement = '<div id="editor'+(edit + 1)+'">\
                                    <textarea id="editArea'+(textarea+1)+'"  rows="5" cols="30">' + editableText + '</textarea>\
                                    <button type="button" class="btn btn-success btnApply" textAreaId="editArea'+(textarea+1)+'" editorId="editor'+(edit + 1)+'" sendBackTo="'+ sendBackTo +'">Apply</button>\
                                    <button type="button" class="btn btn-warning btnCancel" editorId="editor'+(edit + 1)+'" sendBackTo="'+ sendBackTo +'">Cancel</button>\
                              </div>';
        
        $("#" + sendBackTo + "").append(replaceElement);
        $("#" + sendBackTo + "").find('.iconAdd').hide();
        $(this).hide();
        
        CKEDITOR.replace( "editArea"+(textarea+1)+"", {
			extraPlugins: 'mathjax',
			mathJaxLib: 'http://cdn.mathjax.org/mathjax/2.6-latest/MathJax.js?config=TeX-AMS_HTML',
			height: 320,
			filebrowserUploadUrl: '/ckeditor/img_upload/'
		});
        
        
        textarea++;
        edit++;
    });
    
    $('body').on('click','.btnApply', function() {
        var sendBackTo = $(this).attr('sendBackTo');
        var textareaId = $(this).attr('textAreaId');
        var editorId = $(this).attr('editorId');
        var editedText =  CKEDITOR.instances.editor.getData();
        $("#" + sendBackTo + "").find('strong').html(editedText).show();
        $("#" + editorId + "").remove();
    });
    
    $('body').on('click','.btnCancel', function() {
        var editorId = $(this).attr('editorId');
        var sendBackTo = $(this).attr('sendBackTo');
        $("#" + sendBackTo + "").find('strong').show();
        $("#" + editorId + "").remove();
    });
    
    
    
});