#include <iostream>
#include <vector>
#include <functional>

int main() {
    // 1. Capture by value
    int value = 10;
    auto lambda_value = [value]() {
        std::cout << "Capture by value: value = " << value << std::endl;
        value++;
    };
    lambda_value(); // Call the lambda
    value = 20; // Modify original value
    lambda_value(); // Call again, 'value' inside lambda is still 10

    std::cout << "Original value after modification: " << value << std::endl;

    // 2. Capture by reference
    int reference = 30;
    auto lambda_reference = [&reference]() {
        std::cout << "Capture by reference (before modification): reference = " << reference << std::endl;
        reference = 40; // Modify the captured variable
        std::cout << "Capture by reference (after modification): reference = " << reference << std::endl;
    };
    lambda_reference(); // Call the lambda
    std::cout << "Original reference after lambda modification: " << reference << std::endl;

    // 3. Illegal capture attempt (capturing a non-static local variable by value in a default capture by reference lambda)
    // This specific example might compile depending on the compiler and context,
    // but generally, capturing a temporary or a variable that goes out of scope
    // before the lambda is executed can lead to undefined behavior or compilation errors.
    // For a clear "illegal attempt", let's try to capture a variable that is out of scope.
    // This will cause a compile-time error.
    // int out_of_scope_var = 50;
    // {
    //     int inner_var = 60;
    //     auto illegal_lambda = [inner_var]() { // inner_var goes out of scope here
    //         std::cout << "Illegal capture: " << inner_var << std::endl;
    //     };
    // }
    // illegal_lambda(); // This would be an error because illegal_lambda is not defined here.

    // A more direct "illegal" example for demonstration purposes,
    // though modern compilers are smart about this.
    // Capturing a variable that is not defined in the current scope.
    // This will result in a compile-time error: 'undeclared identifier'
    // auto truly_illegal_capture = [non_existent_var]() {
    //     std::cout << "Truly illegal capture: " << non_existent_var << std::endl;
    // };

    // Another common "illegal" scenario is trying to capture a member variable
    // without capturing 'this' or explicitly capturing the member.
    // This is not applicable in main, but would be in a class method.

    // For a practical demonstration of a common capture pitfall (not strictly illegal by syntax, but problematic):
    // Capturing a pointer by value, but the pointed-to data goes out of scope.
    std::cout << "\nDemonstrating capture pitfall (dangling reference/pointer):" << std::endl;
    std::function<void()> dangling_lambda;
    {
        int local_to_block = 100;
        // Capturing by reference: 'local_to_block' will be a dangling reference when lambda is called outside this block
        dangling_lambda = [&local_to_block]() {
            std::cout << "Dangling reference capture: local_to_block = " << local_to_block << std::endl;
        };
    } // local_to_block goes out of scope here

    std::cout << "Attempting to call lambda with dangling reference (undefined behavior):" << std::endl;
    // Calling dangling_lambda here is undefined behavior!
    // dangling_lambda(); // Uncomment to see potential crash or garbage value

    std::cout << "\nDemonstrating explicit capture of 'this' (if in a class method):" << std::endl;
    // If this were a class method:
    // class MyClass {
    // public:
    //     int member_var = 500;
    //     void setup_lambda() {
    //         auto member_lambda = [this]() { // Capture 'this' by value
    //             std::cout << "Captured member_var: " << member_var << std::endl;
    //         };
    //         member_lambda();
    //     }
    // };
    // MyClass obj;
    // obj.setup_lambda();

    return 0;
}
