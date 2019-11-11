public class ApexException extends Exception {
    public static void logExceptions(Exception excptn)
    {
            Exception__c objException = new Exception__c();
            objException.Exception_Message__c=excptn.getMessage();
            objException.Stack_Trace__c=excptn.getStackTraceString();
            objException.Exception_Cause__c=string.valueOf(excptn.getCause());
            objException.Exception_Type__c=excptn.getTypeName();
            objException.Exception_Caused_by__c=userInfo.getUserId();
            upsert objException;
        
    }
    
    
}