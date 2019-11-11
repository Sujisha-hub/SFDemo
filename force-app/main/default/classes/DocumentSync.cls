public class DocumentSync {
    @AuraEnabled
    public static List<DocumentSP__c> getDocumentList(Id recordId) {
        //Fetch data
        try
        {
            DocumentSP__c[] documentDetails;
            Set<Id> contentDocumentId = new Set<Id>();
            List<Id> linkedEntityIds = new List<Id>();
            string objName = string.valueOf(recordId.getSObjectType());
            Integer contentIteration=0;
            if(objName!='User')
            {
                documentDetails= [SELECT Id,DocumentName__c,DocumentType__c,DocumentSize__c,DocumentCreatedDate__c,DocumentURL__c,RelatedID__c,Owner.Name,DocumentVersion__c,OwnerId,CreatedDate FROM DocumentSP__c WHERE RelatedID__c=:recordId ORDER BY DocumentCreatedDate__c DESC];
            }
            else{
                documentDetails= [SELECT Id,DocumentName__c,DocumentType__c,DocumentSize__c,DocumentCreatedDate__c,DocumentURL__c,RelatedID__c,Owner.Name,DocumentVersion__c,OwnerId,CreatedDate FROM DocumentSP__c WHERE OwnerId=:recordId ORDER BY DocumentCreatedDate__c DESC];
            }        
            ContentDocumentLink[] contlink =[SELECT ContentDocumentId,ContentDocument.CreatedDate,LinkedEntityId,LinkedEntity.Name,LinkedEntity.Type  FROM ContentDocumentLink where LinkedEntityId =:recordId ORDER BY ContentDocument.CreatedDate DESC];
            
            
            for(ContentDocumentLink contentDocId:contlink){
                contentDocumentId.add(contentDocId.ContentDocumentId);
                linkedEntityIds.add(contentDocId.LinkedEntityId);
            }
            //ContentVersion[] contVersion=;
            for(ContentVersion contVers:[SELECT ID,Title,FileExtension,ContentSize,CreatedDate,ContentDocumentId,Owner.Name,OwnerId,VersionNumber from ContentVersion Where ContentDocumentId IN:contentDocumentId ORDER BY CreatedDate DESC]){
                DocumentSP__c newdocs= new DocumentSP__c();
                newdocs.DocumentName__c=contVers.Title;                
                newdocs.DocumentType__c=contVers.FileExtension.toLowercase();
                newdocs.DocumentSize__c=string.valueOf(FileSizeToString(contVers.ContentSize));
                newdocs.DocumentCreatedDate__c=contVers.CreatedDate;
                newdocs.OwnerId=contVers.OwnerId;
                newdocs.RelatedID__c=recordId;
                newdocs.DocumentVersion__c=contVers.VersionNumber;
                newdocs.DocumentURL__c=URL.getSalesforceBaseUrl().toExternalForm() +'/lightning/r/ContentDocument/'+contVers.ContentDocumentId+'/view';
                newdocs.Owner_Name__c=contVers.Owner.Name;
                documentDetails.add(newdocs);
                contentIteration++;
                //system.debug('contVers.CreatedDate '+contVers.CreatedDate);
            }
            
            //system.debug('documentDetails '+ documentDetails);
            if(documentDetails.size()>0)
            {
                return documentDetails;
            }
            else
            {
                return null;
            }
        }
        catch(Exception Ex)
        {
            ApexException.logExceptions(Ex);
            return null;
        }
    }
    @AuraEnabled
    public static List<String> objectName(Id recordId) {
        try
        {
            List<string> objResult= new List<string>();
            string recordName;
            string objectName='';
            string objName = String.valueOf(recordId.getSObjectType());
            boolean isCustomObj=objName.contains('__c');
            if(isCustomObj)
            {
                objectName=objName.replace('__c', '');
            }
            else
            {
                objectName=objName;
            }
            List<sObject> sobjList = Database.query('SELECT Id,Name FROM '+objName+' WHERE Id = :recordId');
            String objectRes=JSON.serialize(sobjList);        
            List<Object> fieldList = (List<Object>)JSON.deserializeUntyped(objectRes);
            for(Object fld : fieldList){    
                Map<String,Object> data = (Map<String,Object>)fld;
                recordName=string.valueOf(data.get('Name'));
            }
            objResult.add(objName);  
            objResult.add(recordName);
            objResult.add(objectName);
            return objResult;
        }
        catch(Exception Ex)
        {
            ApexException.logExceptions(Ex);
            return null;
        }
    }
    @AuraEnabled
    public static String LoadObjectName(Id recID){
        Schema.SObjectType sobjectType = recID.getSObjectType();
        String sobjectName = sobjectType.getDescribe().getName();
        return sobjectName;
        
    }
    public static String FileSizeToString(Long Value)
    {
        try
        {
            /* string representation if a file's size, such as 2 KB, 4.1 MB, etc */
            if (Value < 1024)
                return string.valueOf(Value) + ' Bytes';
            else
                if (Value >= 1024 && Value < (1024*1024))
            {
                //KB
                Decimal kb = Decimal.valueOf(Value);
                kb = kb.divide(1024,2);
                return string.valueOf(kb) + ' KB';
            }
            else
                if (Value >= (1024*1024) && Value < (1024*1024*1024))
            {
                //MB
                Decimal mb = Decimal.valueOf(Value);
                mb = mb.divide((1024*1024),2);
                return string.valueOf(mb) + ' MB';
            }
            else
            {
                //GB
                Decimal gb = Decimal.valueOf(Value);
                gb = gb.divide((1024*1024*1024),2);            
                return string.valueOf(gb) + ' GB';
            }
        }
        catch(Exception Ex)
        {
            ApexException.logExceptions(Ex);
            return null;
        }
    }
    @AuraEnabled
    public static Boolean saveDocuments(List<string> RecordIds,string DocumentType,Id recID, string Description){
        Schema.SObjectType sobjectType = recID.getSObjectType();
        String ObjName = sobjectType.getDescribe().getName();
        List<Contentversion> contVersionList= new  List<Contentversion>();
        List<Id> contDocumentIdList= new  List<Id>();
        List<Contentversion> contVersion=[select Id,ContentDocumentId from Contentversion WHERE ContentDocumentId IN :RecordIds];
        for(Contentversion cv:contVersion)
        {
            contDocumentIdList.add(cv.ContentDocumentId);
            Contentversion contVers= new Contentversion();
            contVers.ContentDocumentId=null;  
            contVers.Id=cv.id;
            contVers.Description = Description;
            contVersionList.add(contVers);
        }
        upsert contVersionList;
        return true;
    }
    @AuraEnabled
    public static Boolean DeleteFiles(List<string> RecordIds){
        for(string cv:RecordIds)
        {
            ContentDocument cd=new ContentDocument();
            cd.id=cv;
            delete cd;
        }
        return true;
    }
    
}