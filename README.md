<h1>Sweet Shop Playwright QA Automation</h1>

<h2>About this project</h2>

This project aims to provide QA Automation coverage for a dummy website called <a href='https://sweetshop.netlify.app/'>Sweet Shop</a>. This website has been chosen as it closely resembles a real website with a user base and it simulates most common bugs that can be found on websites, which have given many great ideas for the kind of automated testing to implement. This website also contains many different elements, such as authentication and forms, which have proven to be a great way to learn a QA Automation framework Playwright.

Playwright was chosen as the framework due to its intuitive way of defining tests and automatic waiting for elements to load, which eliminates most if not all flaky tests.

<h2>Running the scripts</h2>

<ol>
    <li>Install NodeJS. You can download it <a href="https://nodejs.org/en/download" target='_blank'>here</a></li>
    <li>Clone this repository using <code>git clone https://github.com/Erikas-Minelga/Sweet-Shop-Playwright-Tests</code></li>
    <li>Install Playwright using <code>npm init playwright@latest</code></li>
    <li>Run the tests using this command: <code>npx playwright test</code> <ul><li>You may also run these tests in UI or Headed mode, using <code>--ui</code> or <code>--headed</code> arguments respectively</li><ul></li>
</ol>

<h2>Test cases</h2>

<h3>Homepage tests</h3>

<table>
    <tr>
        <th>Test case</th><th>Test data</th><th>Pre-conditions</th><th>Steps</th><th>Expected Results</th>
    </tr>
    <tr>
        <td>Homepage has the correct title</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>
            <ol>
                <li>Go to https://sweetshop.netlify.app/</li>
                <li>Observe the title of the page</li>
            </ol>
        </td>
        <td>Title of the page is 'Sweet Shop'</td>
    </tr>
    <tr>
        <td>Browse sweets link functions correctly</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>
            <ol>
                <li>Go to https://sweetshop.netlify.app/</li>
                <li>Click the Browse sweets link</li>
            </ol>
        </td>
        <td>URL should now be 'https://sweetshop.netlify.app/sweets'. Heading of the page should say 'Browse sweets'</td>
    </tr>
    <tr>
        <td>Most popular sweets appear on the homepage</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>
            <ol>
                <li>Go to https://sweetshop.netlify.app/</li>
                <li>Check the Most popular sweets section</li>
            </ol>
        </td>
        <td>4 cards appear under "Our most popular choice of retro sweets' heading. Each item has Add to Basket button and images load correctly.</td>
    </tr>
    <tr>
        <td>Sweets, About, Login and Basket navbar links take user to the appropriate page</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>
            For each of the following navbar links: 'Sweets', 'About', 'Login', 'Basket':
            <ol>
                <li>Go to https://sweetshop.netlify.app/</li>
                <li>Click the navbar link currently testing with</li>
            </ol>
        </td>
        <td>User is taken to the correct page, with the correct URL and page heading.</td>
    </tr>
</table>

<h3>Basket Page tests</h3>

<h4>Form Validation tests</h4>

<table>
    <tr>
        <th>Test case</th><th>Test data</th><th>Pre-conditions</th><th>Steps</th><th>Expected Results</th>
    </tr>
    <tr>
        <td>Submitting incomplete form displays relevant errors</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>
            <ol>
                <li>Go to https://sweetshop.netlify.app/basket</li>
                <li>Click Continue to checkout</li>
            </ol>
        </td>
        <td>Upon form submission, each form item displays an appropriate error</td>
    </tr>
    <tr>
        <td>Entering invalid email displays an appropriate error</td>
        <td>
            Email addresses:
            <ul>
                <li>johnsmith</li>
                <li>johnsmith@testcom</li>
            </ul>
        </td>
        <td>N/A</td>
        <td>
            <ol>
                <li>Go to https://sweetshop.netlify.app/basket</li>
                <li>Type in an incorrectly formatted email address (see test data)</li>
                <li>Click Continue to checkout button</li>
            </ol>
        </td>
        <td>Upon form submission, email field displays an appropriate error</td>
    </tr>
    <tr>
        <td>Entering numeric characters where letters are expected shows a relevant error</td>
        <td>
            <ul>
                <li>First name: 12345</li>
                <li>Last name: 12345</li>
                <li>Name on card: 12345 12345</li>
            </ul>
        </td>
        <td>N/A</td>
        <td>
            <ol>
                <li>Go to https://sweetshop.netlify.app/basket</li>
                <li>Fill out the form as per test data</li>
                <li>Click Continue to checkout button</li>
            </ol>
        </td>
        <td>Upon form submission, elements where only letters are expected display errors when numbers are entered</td>
    </tr>
    <tr>
        <td>Entering non-numeric (letters or symbols) characters in the numeric fields results in an error</td>
        <td>
            Data set 1:
            <ul>
                <li>Credit card number: ABCDABCDABCDABCD</li>
                <li>Expiration: ABCD</li>
            </ul>
            Data set 2:
            <ul>
                <li>Credit card number: !@#$!@#$!@#$!@#$</li>
                <li>Expiration: !@#$</li>
            </ul>
            Data set 3:
            <ul>
                <li>Credit card number: AB!@AB!@AB!@AB!@</li>
                <li>Expiration: AB!@</li>
            </ul>
        </td>
        <td>N/A</td>
        <td>
            <ol>
                <li>Go to https://sweetshop.netlify.app/basket</li>
                <li>Fill out the form as per test data</li>
                <li>Click Continue to checkout button</li>
            </ol>
        </td>
        <td>Upon form submission, elements where only numbers are expected display errors correctly wehen non-numeric characters are entered</td>
    </tr>
    <tr>
        <td>User is unable to enter non-numeric characters into the CVV field</td>
        <td>
            CVVs:
            <ul>
                <li>ABC</li>
                <li>*&(</li>
                <li>A$C</li>
            </ul>
        </td>
        <td>N/A</td>
        <td>
            <ol>
                <li>Go to https://sweetshop.netlify.app/basket</li>
                <li>Attempt to type in characters as per test data into the CVV field</li>
            </ol>
        </td>
        <td>Should be unable to enter any other characters but numbers into the CVV field</td>
    </tr>
    <tr>
        <td>Clicking Continue to checkout with completed form correctly proceeds to checkout</td>
        <td>
            <ul>
                <li>First name: John</li>
                <li>Surname: Smith</li>
                <li>Email: john.smith@test.com</li>
                <li>Address: 10-12 Fairfax St</li>
                <li>Country: United Kingdom</li>
                <li>City: Bristol</li>
                <li>Zip: BS1 3DB</li>
                <li>Name on card: John Smith</li>
                <li>Credit card number: 1234123412341234</li>
                <li>Expiration: 12/40</li>
                <li>CVV: 123</li>
            </ul>
        </td>
        <td>N/A</td>
        <td>
            <ol>
                <li>Go to https://sweetshop.netlify.app/basket</li>
                <li>Fill out the form as per test data</li>
                <li>Click Continue to checkout button</li>
            </ol>
        </td>
        <td>User is taken back to the basket page with the URL: https://sweetshop.netlify.app/basket?. This is a dummy website, so it is expected behaviour</td>
    </tr>
</table>