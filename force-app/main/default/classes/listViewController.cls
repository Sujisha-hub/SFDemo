public class listViewController {
    /*apex method to fetch wrapper of list view*/ 
    @AuraEnabled
    public static list<listViewWrapper> listValues(Id recordId){
 
        list<listViewWrapper> oListViewWrapper = new list<listViewWrapper>();
        
        System.debug('Id'+recordId);
 
        string sObjName = recordId.getSObjectType().getDescribe().getName();

        System.debug('sObjName'+sObjName);
        
        for(ListView lv : [SELECT id, Name, DeveloperName FROM ListView
                           WHERE sObjectType = : sObjName ORDER By Name ASC]){ 
            listViewWrapper oWrapper = new listViewWrapper();
            oWrapper.label = lv.Name;
            oWrapper.developerName = lv.DeveloperName;
            oWrapper.objectName = sObjName;
            oListViewWrapper.add(oWrapper);
        }
        
        return oListViewWrapper; 
    }
 
    /*wrapper class to store listView details*/ 
    public class listViewWrapper{
        @AuraEnabled public string label{get;set;} 
        @AuraEnabled public string developerName{get;set;} 
        @AuraEnabled public string objectName{get;set;} 
    }
}