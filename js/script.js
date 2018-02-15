$(document).ready(function() {
    
    var num = 0;
    var question = 0;
    var answer = 0;
    var explanation = 0;
    var textarea = 0;
    var edit = 0;
    var noOfEditors = 0;
    var btnSolution = 0;
    var tagSelector = 0;
    var submitTags = 0;
    var saveQuestions=[];
    
    var selectId = "";
    
    var qn_id = 0;
    var qn_content = "";
    var ans_id = 0;
    var ans_content = "";
    var soln_id = 0;
    var soln_content = "";
    var tags = [];
    var preselectedTags = [];
    
    function getQuestions() {
        $.getJSON('../json/info.json', function(data) {
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
            boxRenderer();
            
        });
    }
    
    getQuestions();
    
    function getTags() {
        $.getJSON('../json/tags.json', function(tagsList) {
            var temp = tagsList["tags"];
            for(var i = 0; i < temp.length; i++) {
                var obj = {}
                obj["id"] = temp[i]["id"]
                obj["name"] = temp[i]["name"]
                tags.push(obj);
            }
            
        });
        
    }
    getTags();
    
    
    function boxRenderer() {
        $.each(saveQuestions, function(index, value) {
            qn_id = value["qn_id"];
            qn_content = value["qn_content"] == "" ? "Question" : value["qn_content"];
            ans_id = value["ans_id"];
            ans_content = value["ans_content"] == "" ? "Answer" : value["ans_content"];
            soln_id = value["soln_id"];
            soln_content = value["soln_content"] == "" ? "Explanation" : value["soln_content"];
            
            myNewFunction(qn_id, qn_content, ans_id, ans_content, soln_id, soln_content, tags, preselectedTags);
            
            qn_id = 0;
            qn_content = "";
            ans_id = 0;
            ans_content = "";
            soln_id = 0;
            soln_content = "";
        });
    }
    
    function myNewFunction(qn_id, qn_content, ans_id, ans_content, soln_id, soln_content) {
            var mynewbox = '<div class="container box" id="box'+(num + 1)+'">\
                                <label class="lblquestionId">' + qn_id + '</label>\
                                <div class="glyphicon glyphicon-remove" toRemove="box'+(num + 1)+'" questionToRemoveId="' + qn_id + '"></div><br>\
                                <div class="rendererBox">\
                                    <div class="questionRenderer questionContent" id="question'+(question+1)+'" boxId="box'+(num + 1)+'">\
                                        <span class="iconAdd">&plus;</span>\
                                        <strong class="question" parentId="question'+(question+1)+'" questionId="'+qn_id+'" elementId="'+qn_id+'" boxId="box'+(num + 1)+'">'+ qn_content +'</strong>\
                                    </div>\
                                    <div class="answerRenderer questionContent" id="answer'+(answer+1)+'" boxId="box'+(num + 1)+'">\
                                        <span class="iconAdd">&plus;</span>\
                                        <strong class="answer" parentId="answer'+(answer+1)+'" questionId="'+qn_id+'" elementId="'+ ans_id +'" boxId="box'+(num + 1)+'">'+ ans_content +'</strong>\
                                    </div>\
                                    <button type="button" id="btnSolution'+(btnSolution+1)+'" class="btn btn-info btnSolution" explanationId="explanation'+(explanation+1)+'" boxId="box'+(num + 1)+'">view explanation</button>\
                                    <div class="explanationRenderer questionContent" id="explanation'+(explanation+1)+'" boxId="box'+(num + 1)+'">\
                                        <span class="iconAdd">&plus;</span>\
                                        <strong class="explanation" parentId="explanation'+(explanation+1)+'" questionId="'+qn_id+'" elementId="'+ soln_id +'" boxId="box'+(num + 1)+'">'+ soln_content +'</strong>\
                                    </div><br>\
                                    <select id="tagSelector'+(tagSelector+1)+'" multiple class="tagSelector" boxId="box'+(num + 1)+'" questionId="'+qn_id+'"></select>\
                                    <button id="submitTags'+ (submitTags+1) +'" type="button" class="btn btn-success btnSubmitTags" selectId="'+(tagSelector+1)+'" boxId="box'+(num + 1)+'">Submit Tags</button>\
                                </div>\
                            </div>';
        
            
            $('#QandAContainer').prepend(mynewbox);
        
            selectId = $("tagSelector"+(tagSelector+1)+"").attr('id');
            
            convertSelectToChosen(selectId);
            
            
           
            function displayBoxes() {
                var boxId = $("#question"+(question+1)+"").attr('boxId');
                if($("#question"+(question+1)+"").find('.question').html() == "Question") {
                    $("#question"+(question+1)+"").siblings().hide();
                } 
                else
                {
                    /*$('.tagSelector').show();*/
                    $("#question"+(question+1)+"").find('.iconAdd').hide();
                    if($("#answer"+(answer+1)+"").find('.answer').html() == "Answer") {
                        $("#answer"+(answer+1)+"").show();
                        $("#"+ boxId +"").find('.btnSolution').hide();
                        $("#"+ boxId +"").find('.explanationRenderer').hide();
                        /*$("#"+ boxId +"").find('.tagSelector').hide();
                        $("#"+ boxId +"").find('.btnSubmitTags').hide();*/
                        
                    } 
                    else {
                        $("#answer"+(answer+1)+"").find('.iconAdd').hide();
                        if ($("#explanation"+(explanation+1)+"").find('.explanation').html() == "Explanation") { 
                            $("#explanation"+(explanation+1)+"").show();
                            $("#"+ boxId +"").find('.btnSolution').hide();
                            alert("between boxid");
                            /*$("#"+ boxId +"").find('.tagSelector').hide();
                            $("#"+ boxId +"").find('.btnSubmitTags').hide();*/
                        
                        }
                        else {
                            $("#explanation"+(explanation+1)+"").find('.iconAdd').hide();
                            /*$("#"+ boxId +"").find('.btnSolution').show();
                            $("#"+ boxId +"").find('.tagSelector').show();
                            /*$("#"+ boxId +"").find('.btnSubmitTags').hide();*/
                        } 
                    }
                }
            }
            
            displayBoxes();
        
                num++;
                question++;
                answer++;
                explanation++;
                btnSolution++;
                tagSelector++;
                submitTags++
    }
    
    
    function convertSelectToChosen(selectId) {
                $("#"+ selectId +"").chosen({
                    width: "20%",
                    no_results_text: "oops! search failed!",
                    /*max_selected_options: 2,*/
                    allow_single_deselect: true
                });
                populateChosen(selectId);
            }
        
            function populateChosen(selectId) {
                $.each(tags, function(index,value) {

                    var newOption = '<option id="'+ value["id"] +'">'+ value["name"] +'</option>';
                    $("#"+ selectId +"").append(newOption);
                });

                
            }
            
    
    
    
    $('body').on('click','#addQandABox', function() {
        qn_id = 0;
        qn_content = "Question";
        ans_id = 0;
        ans_content = "Answer";
        soln_id = 0;
        soln_content = "Explanation";
        /*tags = "no tags!";
        preselectedTags = "no preselected tags!";*/
        
        myNewFunction(qn_id, qn_content, ans_id, ans_content, soln_id, soln_content);
        /*populateChosen();*/
        $(this).attr('disabled', true);
        $('html, body').animate({scrollTop : 0},200);
		return false;
    });
    
    $('body').on('click','.glyphicon-remove', function() {
        var elementToRemove = $(this).attr('toRemove');
        var questionToRemoveId = $(this).attr('questionToRemoveId');
        $("#" + elementToRemove + "").remove();
        alert("questionId: " +questionToRemoveId);
    });
    
    $('body').on('click','.questionContent strong', function() {
        if(!(noOfEditors > 0)) {
            noOfEditors++;
            var editableText = $(this).html();
            $(this).hide();
            var sendBackTo = $(this).attr('parentId');
            var rootBox = $(this).attr('boxId');
            var questionId = $(this).attr('questionId');
            var elementId = $(this).attr('elementId');
            var replaceElement = '<div id="editor'+(edit + 1)+'">\
                                        <textarea id="editArea"  rows="5" cols="30" editorId="editor'+(edit + 1)+'">' + editableText + '</textarea>\
                                        <button type="button" class="btn btn-success btnApply" textAreaId="editArea" editorId="editor'+(edit + 1)+'" sendBackTo="'+ sendBackTo +'" rootParent="'+ rootBox +'" questionId="' + questionId + '" elementId="' + elementId + '">Apply</button>\
                                        <button type="button" class="btn btn-warning btnCancel" editorId="editor'+(edit + 1)+'" sendBackTo="'+ sendBackTo +'">Cancel</button>\
                                  </div>';
            $("#" + sendBackTo + "").append(replaceElement);
            $("#" + sendBackTo + "").find('.iconAdd').hide();
            $(this).hide();
            
            var ckeditor = CKEDITOR.replace("editArea", {
                extraPlugins: 'mathjax',
                mathJaxLib: 'http://cdn.mathjax.org/mathjax/2.6-latest/MathJax.js?config=TeX-AMS_HTML',
                height: 150,
                filebrowserUploadUrl: '/ckeditor/img_upload/'
            });
            
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
        var questionId = $("#"+ rootBox +"").find(".questionRenderer .question").attr('questionId');
        var editorId = $(this).attr('editorId');
        var elementId = $(this).attr('elementId');
        var editedText =  CKEDITOR.instances.editArea.getData();
        var textSentBack = $("#"+ sendBackTo +"").find('strong').html();
        $("#" + sendBackTo + "").find('strong').html(editedText).show();
        var textSentBack = $("#"+ sendBackTo +"").find('strong').html();
        noOfEditors--;
        if($("#"+sendBackTo+"").hasClass('questionRenderer')) {
            $("#"+rootBox+"").find('.answerRenderer').show();
        }
        if($("#"+sendBackTo+"").hasClass('answerRenderer')) {
            $("#"+rootBox+"").find('.explanationRenderer').show();
        }
        if($("#"+sendBackTo+"").hasClass('explanationRenderer')) {
            $("#"+sendBackTo+"").hide();
            $("#"+rootBox+"").find('.btnSolution').show();
            $('#addQandABox').attr('disabled',false);
            $("#"+rootBox+"").find('.tagSelector').show();
            $("#"+rootBox+"").find('.btnSubmitTags').show();
        }
        console.log("questionId : " + questionId + ", " + "elementId : " + elementId + ", " + "textSentBack : " + textSentBack);
        $("#" + editorId + "").remove();
        
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
        //$("#" + toggleDiv + "").show();
        $("#" + toggleDiv + "").slideToggle("fast");
        $(this).text($(this).text() == "view explanation"?"hide explanation":"view explanation");
        
    });
});