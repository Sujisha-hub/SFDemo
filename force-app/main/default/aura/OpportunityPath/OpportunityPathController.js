({
    //display the key fields and opportunity path selection
    handleSelect : function (component, event, helper) {
        var recordId=component.get("v.recordId");
        var opportunityStage=component.get("v.opportunityStage");
        var currentTarget = event.currentTarget;
        var stepName=currentTarget.getAttribute("data-id");
        var opportunityPaths=["Gathering Needs","Prospecting Options","Verbal Interest","Sent Proposal","Negotiation","Closed Won","Close","Closed Lost"]; 
        component.set("v.selectedStage",stepName);
        if(stepName!=opportunityStage){
            if(stepName=="Close"){
                component.set("v.closeStatus"," Select Closed Stage");
            }
            else
            {
                component.set("v.closeStatus"," Mark as Current Stage");
            }
        }        
        else{
            if((stepName=="Closed Won")||(stepName=="Closed Won")){
                component.set("v.closeStatus"," Change Closed Stage ");
            }
            else
            {
                component.set("v.closeStatus"," Mark Stage as Complete ");
            }
            
        }
        if(!(opportunityPaths.indexOf(stepName)> -1)){
            var action = component.get("c.GetClosureDetail");        
            action.setParams({"recordId":recordId,"closureMonth":stepName});
            action.setCallback(this, function(response) {
                var res=response.getReturnValue();           
                var state = response.getState();
                if ((state === "SUCCESS")&&(res!=null)) 
                {
                    debugger;
                    component.set("v.keyFieldRecordID",res.Id);                    
                }
            });
            $A.enqueueAction(action);          
        }
        $A.get('e.force:refreshView').fire();
        helper.PathSelection(component, event, helper);
    },
    //toggle key fields
    ToggleKeyFields : function (component, event, helper) {
        var keyToggle=component.get("v.hideKeyFields");
        keyToggle==true?component.set("v.keyFieldToggleIcon","utility:chevronup"):component.set("v.keyFieldToggleIcon","utility:chevronright");
        keyToggle==true?component.set("v.hideKeyFields",false):component.set("v.hideKeyFields",true);
    },
    //get the opportunity closure stage and set the values to closure stages
    GetClosureStages: function (component, event, helper) {
        debugger;
        var stageName="";
        var recordId=component.get("v.recordId");
        var selectedStage=component.get("v.selectedStage");
        var action = component.get("c.LoadClosureDetails");        
            action.setParams({"recordId":recordId});
            action.setCallback(this, function(response) {
                var res=response.getReturnValue();           
                var state = response.getState();
                var opts=[];
                if ((state === "SUCCESS")&&(res!=null)) 
                {   
                    for(var i=0;i< res.length;i++){
                        opts.push({ closedStage: res[i].Closed_On__c, closedOn: res[i].Closure_Date__c});
                        component.set("v.selectedStage","Awaiting Closure");
                        component.set("v.opportunityStage",res[i].Closed_On__c);
                    }
                    component.set("v.closureLength", (res.length)-1); 
                    component.set("v.closureStages", opts);      
                    var actHandleSelect = component.get("c.handleSelect");
                    $A.enqueueAction(actHandleSelect); 
                }
                helper.PathSelection(component, event, helper);
                var GetOpportunityStages= component.get("c.GetOpportunityStages");
                $A.enqueueAction(GetOpportunityStages); 
            });
        $A.enqueueAction(action);  
    },
    //Load Oppportunity closure stages
    GetOpportunityDetails: function (component, event, helper) {
        var stageName="";
        var recordId=component.get("v.recordId");
        var action = component.get("c.LoadOppClosureStages");        
            action.setParams({"recordId":recordId});
            action.setCallback(this, function(response) {
                var res=response.getReturnValue();           
                var state = response.getState();
                var opts=[];
                if ((state === "SUCCESS")&&(res!=null)) 
                {   
                    stageName=res[0].StageName;
                    if(stageName!=undefined){
                        component.set("v.selectedStage",res[0].StageName);
                        component.set("v.opportunityStage",res[0].StageName);
                    }
                    else
                    {
                       for(var i=0;i< res.length;i++){
                            opts.push({ closedStage: res[i].Closed_On__c, closedOn: res[i].Closure_Date__c});
                            component.set("v.selectedStage","Awaiting Closure");
                           component.set("v.opportunityStage",res[i].Closed_On__c);
                       }
                        component.set("v.closureLength", (res.length)-1); 
                        component.set("v.closureStages", opts); 
                    }
                    var stepName=component.get("v.selectedStage");
                    if(stepName=="Closed Won"){
                        component.set("v.closeStatus"," Change Closed Stage ");
                    }
                    helper.PathSelection(component, event, helper);
                    
                }
            });
        $A.enqueueAction(action);  
    },
    //save the opportunity stages
    SaveOpportunity: function (component, event, helper) {
        var stepName=component.get("v.selectedStage");
        var closureStages=component.get("v.closureStages");
        var opportunityStage=component.get("v.opportunityStage");
        var recordId=component.get("v.recordId");
        var stepGatheringNeeds=(stepName!="Gathering Needs")?true:false;
        var stepProspOptions=(stepName!="Prospecting Options")?true:false;
        var stepVerbalIntrst=(stepName!="Verbal Interest")?true:false;
        var stepSentPropsl=(stepName!="Sent Proposal")?true:false;
        var stepNegotiation=(stepName!="Negotiation")?true:false;
        
        if(stepGatheringNeeds&&stepProspOptions&&stepVerbalIntrst&&stepSentPropsl&&stepNegotiation){
            var evt = $A.get("e.force:navigateToComponent");  
            evt.setParams({
                componentDef : "c:OpportunityClosure",
                componentAttributes: {    
                    "recordId" : recordId,
                }            
            });
            evt.fire();            
        }
        else
        {
            var action = component.get("c.SaveOpportunityPath");        
            action.setParams({"recordId":recordId,"stage":stepName});
            action.setCallback(this, function(response) {
                var res=response.getReturnValue();           
                var state = response.getState();
                if ((state === "SUCCESS")&&(res!=null)) 
                {   
                    var toastSuccess = $A.get("e.force:showToast");
                    toastSuccess.setParams({
                        //title : insName,
                        message:'Opportunity Path Updated Successfully',
                        duration:' 4000',
                        key: 'info_alt',
                        type: 'success',
                        mode: 'dismissible'
                    });
                    toastSuccess.fire();
                    
                    var navEvt = $A.get("e.force:navigateToSObject");
                    navEvt.setParams({
                        "recordId": recordId,
                        "slideDevName": "related"
                    });
                    navEvt.fire();
                }
            });
            $A.enqueueAction(action);  
            $A.get('e.force:refreshView').fire();
        }
    },
    //load the opportunity stages
    GetOpportunityStages: function (component, event, helper) {
        debugger;
        var action = component.get("c.LoadStagePaths");
        var recordId=component.get("v.recordId");
        action.setParams({"recordId":recordId});
        action.setCallback(this, function(response) {
            var res=response.getReturnValue();
            var state = response.getState();
            if ((state === "SUCCESS")&&(res!=null)) {                
                component.set("v.opportunityStages", res); 
                var GetOpportunityDetails= component.get("c.GetOpportunityDetails");
                $A.enqueueAction(GetOpportunityDetails);  
            }
        });       
        $A.enqueueAction(action);  
    },
})