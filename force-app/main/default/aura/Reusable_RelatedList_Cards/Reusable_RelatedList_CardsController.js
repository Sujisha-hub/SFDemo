({
    GetColumnValues : function(component, event, helper) {
        debugger;
        var objectName=component.get("v.objectName");
        var columnNames=component.get("v.columnNames");
        var action=component.get("c.LoadColumnValues");
        var recordID=component.get("v.recordId");
        var refField=component.get("v.refField");
        var recordType=component.get("v.recordType");
        action.setParams({"columnNames":columnNames,"objectName":objectName,"recordID":recordID,"refField":refField,"recordType":recordType});
        action.setCallback(this, function(response) {
            debugger;
            var res=response.getReturnValue();
            var state=response.getState();
            if ((state === "SUCCESS")&&(res!=null))
            {
                component.set("v.columnValues",res);
                component.set("v.totRecordCount"," ("+res.length+")");
            }
        });
        $A.enqueueAction(action);
    },
    NavToViewAllFiles:function(component,event,helper){
        debugger;
        var recordID=component.get("v.recordId");
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef: "c:Re_Usable_View_All_Records",
            componentAttributes: {
                recordId: recordID,
                objectName:component.get("v.objectName"),
                refField:component.get("v.refField"),
                recordType:component.get("v.recordType"),
            }
        });
        evt.fire();
    },
    
})