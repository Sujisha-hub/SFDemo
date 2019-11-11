public class Testclass {
    @AuraEnabled
    public static string Testclass() {
        List<Lead> leads=[SELECT ID,Name FROM Lead];
        string id=leads[0].ID;
        return id;

    }
}