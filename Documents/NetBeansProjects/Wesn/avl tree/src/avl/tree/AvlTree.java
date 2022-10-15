package avl.tree;
import java.util.*;
public class AvlTree {
    
    public static void main(String[] args)  
    {              
        //creating Scanner class object to get input from user  
        Scanner sc = new Scanner(System.in);  
  
        // create object of ConstructAVLTree class object for costructing AVL Tree  
        ConstructAVLTree obj = new ConstructAVLTree();   
  
        char choice;    //initialize a character type variable to choice   
          
        // perform operation of AVL Tree using switch  
        do      
        {  
            System.out.println("\nSelect an operation:\n");  
            System.out.println("1. Insert a node");  
            System.out.println("2. Search a node");  
            System.out.println("3. Get total number of nodes in AVL Tree");  
            System.out.println("4. Is AVL Tree empty?");  
            System.out.println("5. Remove all nodes from AVL Tree");  
            System.out.println("6. Display AVL Tree in Post order");  
            System.out.println("7. Display AVL Tree in Pre order");  
            System.out.println("8. Display AVL Tree in In order");  
  
            //get choice from user  
            int ch = sc.nextInt();              
            switch (ch)  
            {  
                case 1 :   
                    System.out.println("Please enter an element to insert in AVL Tree");  
                    obj.insertElement( sc.nextInt() );                       
                    break;                            
                case 2 :   
                    System.out.println("Enter integer element to search");  
                    System.out.println(obj.searchElement( sc.nextInt() ));  
                    break;                                            
                case 3 :   
                    System.out.println(obj.getTotalNumberOfNodes());  
                    break;       
                case 4 :   
                    System.out.println(obj.checkEmpty());  
                    break;       
                case 5 :   
                    obj.removeAll();  
                    System.out.println("\nTree Cleared successfully");  
                    break;  
                case 6 :   
                    System.out.println("\nDisplay AVL Tree in Post order");  
                    obj.postorderTraversal();  
                    break;  
                case 7 :   
                    System.out.println("\nDisplay AVL Tree in Pre order");  
                    obj.preorderTraversal();  
                    break;  
                case 8 :   
                    System.out.println("\nDisplay AVL Tree in In order");  
                    obj.inorderTraversal();  
                    break;  
                default :   
                    System.out.println("\n ");  
                    break;      
            }  
            System.out.println("\nPress 'y' or 'Y' to continue \n");  
            choice = sc.next().charAt(0);                          
        } while (choice == 'Y'|| choice == 'y');         
    }  
}
