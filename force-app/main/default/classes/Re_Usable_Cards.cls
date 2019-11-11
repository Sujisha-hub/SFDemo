public class Re_Usable_Cards {
    @AuraEnabled
    public static List <sObject> LoadColumnValues(List<string> columnNames,string objectName,string recordID,string refField,string recordType){
        string columnName='';
        String sQuery=''; 
        system.debug('objectName '+objectName);   
        system.debug('refField '+refField);  
        List <sObject> lstOfRecords= new List <sObject>();
        
        sQuery =  'select '+columnName+' From ' +objectName+' WHERE '+refField+'=:recordID';
        lstOfRecords=Database.query(sQuery);   
        return lstOfRecords;
    }
    @AuraEnabled
    public static List<String> objectName(Id recordId) {
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
}