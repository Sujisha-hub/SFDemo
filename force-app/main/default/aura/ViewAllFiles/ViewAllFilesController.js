({
    doInit: function (component, event, helper) {
        var recordId= component.get("v.recordId");
        var action = component.get("c.getDocumentList");
        action.setParams({"recordId":recordId});
        action.setCallback(this, function(response) {
            var res=response.getReturnValue();
            var state = response.getState();
            if (state === "SUCCESS")
            {
                component.set("v.oppObjs", response.getReturnValue());
                if(res==null){
                    component.set("v.fileCount", "0");
                }
                else{
                    component.set("v.fileCount", res.length);
                } 
            }
            else
            {
                var toastExceptnError = $A.get("e.force:showToast");
                toastExceptnError.setParams({
                    title : 'Please Contact Your Administrator!',
                    message:'Error in Loading Details.',
                    messageTemplate: 'Error in Loading Details',
                    duration:' 4000',
                    key: 'info_alt',
                    type: 'info',
                    mode: 'dismissible'
                });
                toastExceptnError.fire();
            }
        });
        $A.enqueueAction(action);
    },
    viewAll: function (component, event, helper) {
        var res;
        var recordId= component.get("v.recordId");
        var action = component.get("c.objectName");
        action.setParams({"recordId":recordId});
        action.setCallback(this, function(response) {
            res=response.getReturnValue();
            var state = response.getState();
            if ((state === "SUCCESS")&&(res!=null))
            {
                component.set("v.objectName", res[0]);   
                component.set("v.recordName", res[1]);   
                component.set("v.objectDisplayName", res[2]);   
            }
            else
            {
                var toastExceptnError = $A.get("e.force:showToast");
                toastExceptnError.setParams({
                    title : 'Please Contact Your Administrator!',
                    message:'Error in Loading Details.',
                    messageTemplate: 'Error in Loading Details',
                    duration:' 4000',
                    key: 'info_alt',
                    type: 'info',
                    mode: 'dismissible'
                });
                toastExceptnError.fire();
            }
        });
        $A.enqueueAction(action);
    },
    goToObjectName: function(component, event, helper) {
        var objectName= component.get("v.objectName");
        var homeEvt = $A.get("e.force:navigateToObjectHome");
        homeEvt.setParams({
            "scope": objectName
        });
        homeEvt.fire();
    },
    goToRecordName: function(component, event, helper) {
        var recordId= component.get("v.recordId");
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": recordId,
        });
        navEvt.fire();
    }
})