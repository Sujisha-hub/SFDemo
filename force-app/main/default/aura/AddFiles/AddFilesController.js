({
    handleUploadFinished: function (component, event, helper) {
        debugger;
        var uploadedFiles = event.getParam("files");
        console.log(uploadedFiles);
        var docType= component.get("v.docTypeValue");
        var recordId=uploadedFiles[0].documentId;
        component.set("v.xmlFileId",recordId); 
        var opts=[];   
        var fileName=[];
        for(var i=0;i< uploadedFiles.length;i++)
        {
            opts.push(uploadedFiles[i].documentId);
            fileName.push(uploadedFiles[i].name);
        }             
        component.set("v.uploadedFiles",opts);
        component.set("v.noOfFiles", uploadedFiles.length);
        component.set("v.fileNames", fileName);
        var doInitMethod=component.get("c.doInit");
        $A.enqueueAction(doInitMethod);
        
    },
    UploadXMLFile: function (component, event, helper) {
        debugger;
        var recordId=component.get("v.xmlFileId");
        var clarinetRecId=component.get("v.recordId");
        var action = component.get("c.ClarinetImport");
        action.setParams({"recID":recordId});
        action.setCallback(this, function(response) {
            var res=response.getReturnValue();           
            var state = response.getState();
            if ((state === "SUCCESS")&&(res!=null)) {  
                var xmlObject=JSON.parse(res);
                var insuredCount=(xmlObject.insured);
                console.log("result "+JSON.stringify(xmlObject));
                var evt = $A.get("e.force:navigateToComponent");  
                debugger;
                evt.setParams({
                    componentDef : "c:ClarinetValidator",
                    componentAttributes: {    
                        "xmlResponse" : xmlObject,
                        "policyID":xmlObject.policyID!=null?xmlObject.policyID:null,
                        "IssueDate":xmlObject.IssueDate!=null?xmlObject.IssueDate:null,
                        "DeathBenefitType":xmlObject.DeathBenefitType!=null?xmlObject.DeathBenefitType:null,
                        "FaceAmount":xmlObject.FaceAmount!=null?xmlObject.FaceAmount:null,
                        "IllustrationDate":xmlObject.IllustrationDate!=null?xmlObject.IllustrationDate:null,
                        "MaturityAge":xmlObject.MaturityAge!=null?xmlObject.MaturityAge:null,
                        "PolicyYear":xmlObject.PolicyYear!=null?(xmlObject.PolicyYear).toString():null,
                        "DeathBenefit":xmlObject.DeathBenefit!=null?parseInt(xmlObject.DeathBenefit):null,
                        "EndOfYearAccountValue":xmlObject.EndOfYearAccountValue!=null?parseInt(xmlObject.EndOfYearAccountValue):null,
                        "EndOfYearSurrenderValue":xmlObject.EndOfYearSurrenderValue!=null?parseInt(xmlObject.EndOfYearSurrenderValue):null,
                        "NonGuaranteedRate":xmlObject.NonGuaranteedRate!=null?parseInt(xmlObject.NonGuaranteedRate):null,
                        "PremiumToBePaid":xmlObject.PremiumToBePaid!=null?parseInt(xmlObject.PremiumToBePaid):null,
                        "PercentOfPremiumCharge":xmlObject.PercentOfPremiumCharge!=null?parseInt(xmlObject.PercentOfPremiumCharge):null,
                        "Carrier":xmlObject.Carrier!=null?xmlObject.Carrier:null,
                        "IssuingCarrier":xmlObject.IssuingCarrier!=null?xmlObject.IssuingCarrier:null,
                        "PolicyDate":xmlObject.PolicyDate!=null?xmlObject.PolicyDate:null,
                        "PolicyNumber":xmlObject.PolicyNumber!=null?xmlObject.PolicyNumber:null,
                        "LifePolicyType":xmlObject.LifePolicyType!=null?xmlObject.LifePolicyType:null,
                        "StateOfOwnership":xmlObject.StateOfOwnership!=null?xmlObject.StateOfOwnership:null,
                        "PolicyOwnrType":xmlObject.PolicyOwnerType!=null?xmlObject.PolicyOwnerType:null,
                        "PremiumFinanced":xmlObject.PremiumFinanced!=null?xmlObject.PremiumFinanced:null,
                        "PrimaryInsuredUnderwritingClass":xmlObject.PrimaryInsuredUnderwritingClass!=null?xmlObject.PrimaryInsuredUnderwritingClass:null,
                        "PerUnitCharge":xmlObject.PerUnitCharge!=null?parseInt(xmlObject.PerUnitCharge):null,
                        "PerPolicyCharge":xmlObject.PerPolicyCharge!=null?parseInt(xmlObject.PerPolicyCharge):null,
                        "CountryOfOwnership":xmlObject.CountryOfOwnership!=null?xmlObject.CountryOfOwnership:null,
                        "ExtendedDbRider":xmlObject.ExtendedDbRider!=null?Boolean(xmlObject.ExtendedDbRider):null,
                        "MaturityAgeWithDbRider":xmlObject.MaturityAgeWithDbRider!=null?parseInt(xmlObject.MaturityAgeWithDbRider):null,
                        "PolicyCoverageType":xmlObject.PolicyCoverageType!=null?xmlObject.PolicyCoverageType:null,
                        "AgeBasis":xmlObject.AgeBasis!=null?xmlObject.AgeBasis:null,
                        "PremiumScheduleType":xmlObject.PremiumScheduleType!=null?xmlObject.PremiumScheduleType:null,
                        "insured":xmlObject.insured!=null?xmlObject.insured:null,
                        "xmlDocumentId":recordId,
                        "clarinetObjRecId":clarinetRecId,
                    }
                    
                });
                evt.fire();
            }
            else
            {
                var toastExceptnError = $A.get("e.force:showToast");
                toastExceptnError.setParams({
                    title : 'Please Contact Your Administrator!',
                    message:'Error in Parsing XML File',
                    messageTemplate: 'Error in Parsing XML File',
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
    saveFileType: function (component, event, helper) {
        debugger;
        var objectName= component.get("v.objectName");
        //var objName= component.get("v.objName");
        var docTypeValidation=false;
        var fileLengthValidation=false;
        var fileIds= component.get("v.uploadedFiles");
        fileIds.length==0?component.set("v.noOfFiles","0" ):component.set("v.noOfFiles",fileIds.length);
        if(objectName!='Clarinet_Import__c'){
            var docType= component.get("v.docTypeValue");
            var docuType = component.find("documentType");
            var descriptionVal = component.get("v.descriptionValue");
            var recordId= component.get("v.recordId");
            var action = component.get("c.saveDocuments");
            // continue processing        
            if((objectName == 'Account' || objectName == 'Policy__c' || objectName == 'Funder_Status__c') && (fileIds.length > 0))
            {
                fileLengthValidation=true;
                action.setParams({"RecordIds":fileIds,"DocumentType":docType,"recID":recordId,"Description":descriptionVal});
                if(docuType.get("v.validity").valid){  
                    docTypeValidation=true;
                }
                else {
                    docuType.showHelpMessageIfInvalid();
                }
            }
            else if((objectName != 'Account' || objectName != 'Policy__c' || objectName != 'Funder_Status__c') && (fileIds.length > 0))
            {
                docTypeValidation=true;
                fileLengthValidation=true;
                action.setParams({"RecordIds":fileIds,"DocumentType":docType,"recID":recordId});
            }
            action.setCallback(this, function(response) {
                var res=response.getReturnValue();           
                var state = response.getState();
                if ((state === "SUCCESS")&&(res!=null)) {     
                    component.set("v.fileNames", "");
                    component.set("v.docTypeValue", "");
                    component.set("v.descriptionValue",""); 
                    component.set("v.uploadedFiles",[]);
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "type" : "success",
                        "message": fileIds.length+" files has been uploaded successfully!"
                    });
                    
                    var uploadFinish=component.get("c.RefreshFileUpload");
                    $A.enqueueAction(uploadFinish);                   
                    var doInitMethod=component.get("c.doInit");
                    $A.enqueueAction(doInitMethod);
                    toastEvent.fire(); 
                }
            });
            if(docTypeValidation&&fileLengthValidation){
                $A.enqueueAction(action);   
            }            
        }
        else
        {
            var uploadXML = component.get("c.UploadXMLFile");
            if(fileIds.length > 0){
                $A.enqueueAction(uploadXML); 
            }            
        }
    },
    doInit: function (component, event, helper) {
        var recordId= component.get("v.recordId");   
        component.set("v.recordId",recordId);
        var action = component.get("c.getDocumentList");
        action.setParams({"recordId":recordId});
        action.setCallback(this, function(response) {
            var res=response.getReturnValue();
            var state = response.getState();
            if (state === "SUCCESS")
            {
                component.set("v.oppObjs", response.getReturnValue());
                if(res==null)
                {
                    component.set("v.oppValue",false);
                    component.set("v.fileCount","");
                }
                else{
                    if(res.length>3)
                    {
                        component.set("v.fileCount","(3+)");
                    }
                    else{
                        component.set("v.fileCount",'('+res.length+')');
                    }                
                    component.set("v.oppValue",true);
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
        $A.get('e.force:refreshView').fire();
    },
    
    viewAllFiles:function(component,event,helper){
        $A.get('e.force:refreshView').fire();
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef: "c:ViewAllFiles",
            componentAttributes: {
                recordId: component.get("v.recordId"),
            }
        });
        evt.fire();
    },
    getDocumentTypes: function (component, event, helper) {
        debugger;
        var recordId= component.get("v.recordId"); 
        var action = component.get("c.LoadDocumentTypes");
        //var objectName= component.get("v.objectName");  
        action.setParams({"recID":recordId});
        action.setCallback(this, function(response) {
            var res=response.getReturnValue();           
            var state = response.getState();
            var opts=[];
            if ((state === "SUCCESS")&&(res!=null)) {                 
                for(var i=0;i< res.length;i++){
                    opts.push({ value: res[i], label: res[i]});
                }
                component.set("v.documentType", opts);     
            }
            else
            {
                component.set("v.docTypeOptns", false);
                //component.set("v.objectName",res);
            }
        });
        $A.enqueueAction(action);      
    },
    GetObjectName: function (component, event, helper) {
        debugger;
        var recordId= component.get("v.recordId"); 
        var action = component.get("c.LoadObjectName");        
        action.setParams({"recID":recordId});
        action.setCallback(this, function(response) {
            var res=response.getReturnValue();           
            var state = response.getState();
            if ((state === "SUCCESS")&&(res!=null)) 
            {   
                component.set("v.objectName", res);
                //component.set("v.objName", res); 
                //var objectName= component.get("v.objectName"); 
            }
        });
        $A.enqueueAction(action);      
    },
    toggle : function(component, event, helper) {
        var fileDetails = component.find("fileDetails");
        var fileUpload = component.find("fileUpload");
        var fileDetailClass= $A.util.hasClass(fileDetails, "slds-show");
        
        if(fileDetailClass)
        {
            $A.util.removeClass(fileDetails, 'slds-show');
            $A.util.addClass(fileDetails, 'slds-hide');
            $A.util.addClass(fileUpload, 'slds-show');
            $A.util.removeClass(fileUpload, 'slds-hide');
        }
        else{
            $A.util.removeClass(fileDetails, 'slds-hide');
            $A.util.addClass(fileDetails, 'slds-show');
            $A.util.addClass(fileUpload, 'slds-hide');
            $A.util.removeClass(fileUpload, 'slds-show');
        }
    },
    RefreshFileUpload : function(component, event, helper) {
        var fileDetails = component.find("fileDetails");
        var fileUpload = component.find("fileUpload");
        var fileDetailClass= $A.util.hasClass(fileDetails, "slds-hide");
        if(fileDetailClass)
        {
            $A.util.addClass(fileDetails, 'slds-show');
            $A.util.removeClass(fileDetails, 'slds-hide');
            $A.util.removeClass(fileUpload, 'slds-show');
            $A.util.addClass(fileUpload, 'slds-hide');
        }
        else{
            $A.util.addClass(fileDetails, 'slds-hide');
            $A.util.removeClass(fileDetails, 'slds-show');
            $A.util.removeClass(fileUpload, 'slds-hide');
            $A.util.addClass(fileUpload, 'slds-show');
        }
    },
    CancelFileUpload : function(component, event, helper) {
        var fileIds= component.get("v.uploadedFiles");
        var action = component.get("c.DeleteFiles");
        action.setParams({"RecordIds":fileIds});
        action.setCallback(this, function(response) {
            var res=response.getReturnValue();           
            var state = response.getState();
            if ((state === "SUCCESS")&&(res!=null)) {  
                component.set("v.fileNames", "");
                component.set("v.docTypeValue", "");
                var uploadFinish=component.get("c.RefreshFileUpload");
                $A.enqueueAction(uploadFinish);                   
                var doInitMethod=component.get("c.doInit");
                $A.enqueueAction(doInitMethod);
            }
        });
        $A.enqueueAction(action);      
    }
    
})