({
    //load opportunity closure options
    LoadOptions: function (component, event, helper) {
        var options = [
            { value: "Awaiting Closure", label: "Partial Closure" },
            { value: "Closed Won", label: "Closed Won" },
            { value: "Closed Lost", label: "Closed Lost" }
        ];
        component.set("v.closeOptions", options);
    },
     //close the opportunity closure popup
    CloseModel: function(component, event, helper) {
        var recordId= component.get("v.recordId");  
        component.set("v.isOpen", false);      
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": recordId,
            "slideDevName": "activity"
        });
        navEvt.fire();
    },
    //Update the opportunity with the values provided in the closure popup
    UpdateOpportunity: function(component, event, helper) {
        var oppStages=component.get("v.oppStage");  
        var oppDates=component.get("v.oppDate");  
        var recordId=component.get("v.recordId");
        var closingAmount=component.get("v.closingAmount");
        var opportunityAmount=component.get("v.opportunityAmount");
        var action = component.get("c.SaveOpportunity"); 
        action.setParams({"recordId":recordId,"oppStage":oppStages,"oppDate":oppDates,"closureAmount":closingAmount});
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
        //$A.get('e.force:refreshView').fire();
    },
    //get closure amount and opportunit amount
    LoadClosureDetails: function(component, event, helper) {
        var recordId=component.get("v.recordId");
        var action = component.get("c.GetClosureDetails"); 
        action.setParams({"recordId":recordId});
        action.setCallback(this, function(response) {
            var res=response.getReturnValue();
            var state = response.getState();
            if ((state === "SUCCESS")&&(res!=null)) 
            {   
                component.set("v.opportunityAmount",res[1]);
                component.set("v.closureAmount",res[0]);
            }
        });
        $A.enqueueAction(action); 
    },
    //validate closed won stage
    ValidateStage: function(component, event, helper) {
        var stagesOptionsId=component.find('stagesOptions');
        var stageOption=component.find('stagesOptions').get("v.value");
        var valstageOption=!$A.util.isEmpty(stageOption);
        var oppStages=component.get("v.oppStage"); 
        var oppclosureAmount=component.find('clsrAmount').get("v.value");
        var closingAmount=component.get("v.closureAmount");
        var finalPrice=parseFloat(closingAmount)+parseFloat(oppclosureAmount);
        var opportunityAmount=component.get("v.opportunityAmount");
        var oppBalanceAmount=parseFloat(opportunityAmount)-parseFloat(closingAmount);
        if(valstageOption){
            component.set("v.stageVal",true);
            if(oppStages=="Closed Won"){
                component.set("v.closingAmount",oppBalanceAmount);
            }
            else
            {
                component.set("v.closingAmount","");
            }
        }
        
    },
    //validate the fields
    ValidateFields: function(component, event, helper) {
        var valstageOption=component.get("v.stageVal");
        
        var closeDateId=component.find('closeDate');
        var oppCloseDate=component.find('closeDate').get("v.value");
        var valCloseDate=!$A.util.isEmpty(oppCloseDate);
        
        var oppStages=component.get("v.oppStage");  
        var clsrAmountId=component.find('clsrAmount');
        var oppclosureAmount=component.find('clsrAmount').get("v.value");
        var valClosureAmount=!$A.util.isEmpty(oppclosureAmount);
        var closingAmount=component.get("v.closureAmount");
        var finalPrice=parseFloat(closingAmount)+parseFloat(oppclosureAmount);
        var opportunityAmount=component.get("v.opportunityAmount");
        var oppBalanceAmount=parseFloat(opportunityAmount)-parseFloat(closingAmount);
        
        if((valstageOption)&&(valCloseDate)&&(valClosureAmount)){
            if(finalPrice<=opportunityAmount){
                component.set("v.errorMessage",false);
                component.set("v.saveValue",true);
                if(finalPrice==opportunityAmount){
                    if(oppStages!="Awaiting Closure"){
                        component.set("v.saveValue",true);
                        component.set("v.errorMessage",false);
                    }
                    else
                    {
                        component.set("v.errorMessage",true);
                        component.set("v.saveValue",false);
                    }
                }
                else
                {
                    component.set("v.errorMessage",false);
                }
            } 
            else
            {
                component.set("v.saveValue",false);
            }
        }
        else
        {
            component.set("v.saveValue",false);
        }
    }
})