public class searchController {
    @AuraEnabled
    public static List < account > fetchAccount(String searchKeyWord) {
        String searchKey = searchKeyWord + '%';
        List < Account > returnList = new List < Account > ();
        List < Account > lstOfAccount = [select id, Name, Type, Industry, Phone, Fax from account
                                         where Name LIKE: searchKey LIMIT 500];
        
        for (Account acc: lstOfAccount) {
            returnList.add(acc);
        }
        return returnList;
    }
    
    @AuraEnabled
    public static string GetSObjectName(Id recordId)
    {
        System.debug('Id'+recordId);
 
        string sObjName = recordId.getSObjectType().getDescribe().getName();
        
        return sObjName;
    }
}