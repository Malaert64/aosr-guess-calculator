

// Global variables to keep track of things during the calculation process.
var books = 2;
var bosses = 0;
var book_1_souls = 0;
var book_2_souls = 0;
var book_3_souls = 0;

var book_1 = "";
var book_1_type = 0;
var book_2 = "";
var book_2_type = 0;

var first_book = "";
var second_book = "";
var third_book = "";

// Initial landing page.
document.getElementById("content").innerHTML = 
    `<h2>Books Found:</h2>
    <input type="radio" id="zero" name="book_count" value="0">
    <label for="zero">Zero</label>
    <input type="radio" id="one" name="book_count" value="1">
    <label for="one">One</label>
    <input type="radio" id="two" name="book_count" value="2" checked>
    <label for="two">Two</label>
    <br>
    <button class="nextButton" onclick="submitBookCount()">Next</button>`;

function reset() {
    books = 2;
    bosses = 0;
    book_1_souls = 0;
    book_2_souls = 0;
    book_3_souls = 0;

    book_1 = "";
    book_1_type = 0;
    book_2 = "";
    book_2_type = 0;

    first_book = "";
    second_book = "";
    third_book = "";

    document.getElementById("content").innerHTML = 
        `<h2>Books Found:</h2>
        <input type="radio" id="zero" name="book_count" value="0">
        <label for="zero">Zero</label>
        <input type="radio" id="one" name="book_count" value="1">
        <label for="one">One</label>
        <input type="radio" id="two" name="book_count" value="2" checked>
        <label for="two">Two</label>
        <br>
        <button class="nextButton" onclick="submitBookCount()">Next</button>`;
}

// Function that takes the amount of books found thus far.
function submitBookCount() {
    // Get the number of books from the radio buttons.
    books = document.querySelector('input[name="book_count"]:checked').value;

    // Different follow ups depending on how many books are known.
    if (parseInt(books) === 2) {
        /* If two books are known, we ask for the colours of those 
        two books and the type of each, i.e., soul or boss kill. */
        document.getElementById("content").innerHTML = 
            `<h2>Book Details:</h2>
            <label for="book_1">Book 1:</label>
            <select id="book_1" name="book_1">
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="yellow">Yellow</option>
            </select>
            <input type="radio" id="soul" name="book_1_type" value="0" checked>
            <label for="soul">Soul</label>
            <input type="radio" id="boss" name="book_1_type" value="1">
            <label for="boss">Boss</label>
            <br>
            <label for="book_2">Book 2:</label>
            <select id="book_2" name="book_2">
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="yellow">Yellow</option>
            </select>
            <input type="radio" id="soul" name="book_2_type" value="0" checked>
            <label for="soul">Soul</label>
            <input type="radio" id="boss" name="book_2_type" value="1">
            <label for="boss">Boss</label>
            <br>
            <button class="nextButton" onclick="submitTwoBooks()">Next</button>`;

    } else if (parseInt(books) === 1) {
        /* If one book is known, we ask for the colour 
        and book type, i.e., soul or boss kill. */
        document.getElementById("content").innerHTML = 
            `<h2>Book Details:</h2>
            <label for="book_1">Book 1:</label>
            <select id="book_1" name="book_1">
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="yellow">Yellow</option>
            </select>
            <input type="radio" id="soul" name="book_1_type" value="0" checked>
            <label for="soul">Soul</label>
            <input type="radio" id="boss" name="book_1_type" value="1">
            <label for="boss">Boss</label>
            <br>
            <button class="nextButton" onclick="submitOneBook()">Next</button>`;

    } else if (parseInt(books) === 0) {
        // If no books are known, we have no questions to ask about book specs.
        submitZeroBooks();
    }
}

// Initial processing if the user selected they've found two books.
function submitTwoBooks() {
    // Obtain and store the user input from the previous step.
    book_1 = document.getElementById("book_1").value;
    book_1_type = document.querySelector('input[name="book_1_type"]:checked').value;
    book_2 = document.getElementById("book_2").value;
    book_2_type = document.querySelector('input[name="book_2_type"]:checked').value;

    // Determine the colour of the final book.
    if ((book_1 === "red" && book_2 === "blue") || 
        (book_2 === "red" && book_1 === "blue")) {
        third_book = "Yellow";
    } else if ((book_1 === "red" && book_2 === "yellow") || 
        (book_2 === "red" && book_1 === "yellow")) {
        third_book = "Blue";
    } else if ((book_1 === "blue" && book_2 === "yellow") ||
        (book_2 === "blue" && book_1 === "yellow")) {
        third_book = "Red";
    } else {
        return; // Error, not valid book input
    }

    /* If we know the last book is a boss kill objective, we only
    need to ask how many bosses have been killed thus far.*/
    if (parseInt(book_1_type) === 0 && parseInt(book_2_type) === 0) {
        document.getElementById("content").innerHTML = 
            `<h2>Boss Details:</h2>
            <label for="bosses">Bosses Killed:</label>
            <select id="bosses" name="bosses">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
            </select>
            <br>
            <button class="nextButton" onclick="submitTwoBookData()">Next</button>`;

    /* Likewise, if we know the last book is a soul, we only need to
    ask how many soul canisters of the third type have been found.*/
    } else if (parseInt(book_1_type) === 1 && parseInt(book_2_type) === 1) {
        document.getElementById("content").innerHTML = 
            `<h2>Soul Details:</h2>
            <label for="souls">`+ third_book + ` Canisters Found:</label>
            <select id="souls" name="souls">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>
            <br>
            <button class="nextButton" onclick="submitTwoBookData()">Next</button>`;

    /* Handling other situations requires querying the 
    player for both their soul count and boss kill count. */
    } else {
        document.getElementById("content").innerHTML = 
            `<h2>Soul & Boss Details:</h2>
            <label for="souls">`+ third_book + ` Canisters Found:</label>
            <select id="souls" name="souls">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>
            <br>
            <label for="bosses">Bosses Killed:</label>
            <select id="bosses" name="bosses">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
            </select>
            <br>
            <button class="nextButton" onclick="submitTwoBookData()">Next</button>`;
    }
}

// Initial processing if the user selected they've found one book.
function submitOneBook() {
    // Obtain and store user input from the previous step.
    book_1 = document.getElementById("book_1").value;
    book_1_type = document.querySelector('input[name="book_1_type"]:checked').value;

    // Determine the colours of the two missing books.
    if (book_1 === "red") {
        second_book = "Blue";
        third_book = "Yellow";
    } else if (book_1 === "blue") {
        second_book = "Red";
        third_book = "Yellow";
    } else if (book_1 === "yellow") {
        second_book = "Red";
        third_book = "Blue";
    } else {
        return; // Error, not valid book input
    }

    /* Query the player for their soul counts for the missing
    two book colours, as well as their boss kill count. */ 
    document.getElementById("content").innerHTML = 
        `<h2>Soul & Boss Details:</h2>
        <label for="book_2_souls">`+ second_book + ` Canisters Found:</label>
        <select id="book_2_souls" name="book_2_souls">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
        </select>
        <br>
        <label for="book_3_souls">`+ third_book + ` Canisters Found:</label>
        <select id="book_3_souls" name="book_3_souls">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
        </select>
        <br>`;

    if (parseInt(book_1_type) === 1) {
        document.getElementById("content").innerHTML +=    
            `<label for="bosses">Bosses Killed:</label>
            <select id="bosses" name="bosses">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
            </select>
            <br>
            <button class="nextButton" onclick="submitOneBookData()">Next</button>`;

    } else {
        document.getElementById("content").innerHTML +=    
            `<label for="bosses">Bosses Killed:</label>
            <select id="bosses" name="bosses">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
            </select>
            <br>
            <button class="nextButton" onclick="submitOneBookData()">Next</button>`;
    }

}

/* Initial processing if the user is a psychopath 
and selected that they have found zero books. */
function submitZeroBooks() {
    // Set the colours of the three books.
    first_book = "Red";
    second_book = "Blue";
    third_book = "Yellow";

    /* Query the player for their soul counts for all three
    canister colours, as well as their boss kill count. */ 
    document.getElementById("content").innerHTML = 
        `<h2>Soul & Boss Details:</h2>
        <label for="book_1_souls">`+ first_book + ` Canisters Found:</label>
        <select id="book_1_souls" name="book_1_souls">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
        </select>
        <br>
        <label for="book_2_souls">`+ second_book + ` Canisters Found:</label>
        <select id="book_2_souls" name="book_2_souls">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
        </select>
        <br>
        <label for="book_3_souls">`+ third_book + ` Canisters Found:</label>
        <select id="book_3_souls" name="book_3_souls">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
        </select>
        <br>
        <label for="bosses">Bosses Killed:</label>
        <select id="bosses" name="bosses">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
        </select>
        <br>
        <button class="nextButton" onclick="submitZeroBookData()">Next</button>`;
}

// Output processing for two book input.
function submitTwoBookData() {
    // Handler for when the final book is guaranteed to be a boss kill.
    if (parseInt(book_1_type) === 0 && parseInt(book_2_type) === 0) {
        // Get user input from previous step.
        bosses = document.getElementById("bosses").value;
        
        // Output part 1 and calculations.
        document.getElementById("content").innerHTML = 
            `<h2>Results:</h2>
            <p>The likelihood of being able to progress beyond Graham at this time hinges on the number of bosses you have defeated.</p>
            <p>Given you have defeated ` + bosses + ` of the 7 bosses, the probability having all requirements for Graham met is <b>` + ((parseFloat(bosses)/7)*100).toFixed(2) + `%</b>.</p>`;

        /* Second output stage, catching if the probability is 0%. 
        This results in a division by zero error if we don't explicitly handle it. */
        if (parseInt(bosses) === 0) {
            document.getElementById("content").innerHTML += 
                `<p>The probability of guessing correctly on your first attempt is <b>0.00%</b>.</p>
                <button onclick="reset()">Restart</button>`;
        } else {
            document.getElementById("content").innerHTML += 
                `<p>The probability of guessing correctly on your first attempt is <b>` + ((parseFloat(bosses)/7)*100).toFixed(2) + `%</b>.</p>
                <button onclick="reset()">Restart</button>`;
        }

    // Handler for when hte final book is guaranteed to be a soul.
    } else if (parseInt(book_1_type) === 1 && parseInt(book_2_type) === 1) {
        // Get user input from previous step.
        book_3_souls = document.getElementById("souls").value;

        // Output and calculations, part 1.
        document.getElementById("content").innerHTML = 
            `<h2>Results:</h2>
            <p>The likelihood of being able to progress beyond Graham at this time hinges on the number of ` + third_book + ` Souls you have found in Canisters.</p>
            <p>Given you have found ` + book_3_souls + ` of the 6 ` + third_book + ` Souls, the probability having all requirements for Graham met is <b>` + ((parseFloat(book_3_souls)/6)*100).toFixed(2) + `%</b>.</p>`;

        /* Second output stage, catching if the probability is 0%. 
        This results in a division by zero error if we don't explicitly handle it. */
        if (parseInt(book_3_souls) === 0) {
            document.getElementById("content").innerHTML += 
            `<p>The probability of guessing correctly on your first attempt is <b>0.00%</b>.</p>
            <button onclick="reset()">Restart</button>`;
        } else {
            document.getElementById("content").innerHTML += 
            `<p>The probability of guessing correctly on your first attempt is <b>` + (((parseFloat(book_3_souls)/6) * (1/parseFloat(book_3_souls)))*100).toFixed(2) + `%</b>.</p>
            <button onclick="reset()">Restart</button>`;
        }

    // If the final book could be either a soul or boss kill, it's handled here.
    } else {
        // Get user input from previous step.
        book_3_souls = document.getElementById("souls").value;
        bosses = String(parseInt(document.getElementById("bosses").value) - 1);

        // Output and calculations, part 1 (done by Rule of Sum).
        document.getElementById("content").innerHTML = 
            `<h2>Results:</h2>
            <p>We find ourselves in a situation where one of the bosses killed was the objective for another book. Thus, only six possible bosses remain.</p>
            <p>Given you have found ` + book_3_souls + ` of the 6 ` + third_book.toLowerCase() + ` Souls and killed ` + bosses + ` of the 6 <i>other</i> bosses, the probability having all requirements for Graham met is <b>` + ((((parseFloat(book_3_souls)/6)/2) + ((parseFloat(bosses)/6)/2))*100).toFixed(2) + `%</b>.</p>`;

        /* Second output stage, catching if the probability is 0%. 
        This results in a division by zero error if we don't explicitly handle it. */
        if (parseInt(book_3_souls) === 0 && parseInt(bosses) === 0) {
            document.getElementById("content").innerHTML += 
            `<p>The probability of guessing correctly on your first attempt is <b>0.00%</b>.</p>
            <button onclick="reset()">Restart</button>`;
        } else if (parseInt(book_3_souls) === 0) {
            document.getElementById("content").innerHTML += 
            `<p>The probability of guessing correctly on your first attempt is <b>` + ((((parseFloat(bosses)/6)/2))*100).toFixed(2) + `%</b>.</p>
            <button onclick="reset()">Restart</button>`;
        } else {
            document.getElementById("content").innerHTML += 
            `<p>The probability of guessing correctly on your first attempt is <b>` + (((((parseFloat(book_3_souls)/6) * (1/parseFloat(book_3_souls)))/2) + ((parseFloat(bosses)/6)/2))*100).toFixed(2) + `%</b>.</p>
            <button onclick="reset()">Restart</button>`;
        }
    }
}

// Output processing for one book input.
function submitOneBookData() {
    // Getting user input from previous step.
    book_2_souls = document.getElementById("book_2_souls").value;
    book_3_souls = document.getElementById("book_3_souls").value;

    if (parseInt(book_1_type) === 0) {
        // More user input.
        bosses = document.getElementById("bosses").value;

        // Calculating probabilities, via Rule of Sum and Rule of Product.
        var s_bk_bk = (parseFloat(bosses)/7) * (parseFloat(bosses-1)/6);
        var s_s_bk = (((parseFloat(book_2_souls)/6)/2) + ((parseFloat(book_3_souls)/6)/2)) * (parseFloat(bosses)/7);

        var p_total = 0;

        // The player has no souls of the possible missing colours.
        if (parseInt(book_2_souls) === 0 && parseInt(book_3_souls) === 0) {
            p_total = ((s_bk_bk)/2);

        // The player only has souls of one of the possible missing colours.
        } else if (parseInt(book_2_souls) === 0) {
            p_total = ((s_bk_bk)/2) + ((( (((parseFloat(book_3_souls)/6) * (1/parseFloat(book_3_souls)))/2) ) * (parseFloat(bosses)/7))/2);

        } else if (parseInt(book_3_souls) === 0) {
            p_total = ((s_bk_bk)/2) + ((( (((parseFloat(book_2_souls)/6) * (1/parseFloat(book_2_souls)))/2) ) * (parseFloat(bosses)/7))/2);

        // The player has souls in all possible colours.
        } else {
            p_total = ((s_bk_bk)/2) + ((( (((parseFloat(book_2_souls)/6) * (1/parseFloat(book_2_souls)))/2) + (((parseFloat(book_3_souls)/6) * (1/parseFloat(book_3_souls)))/2) ) * (parseFloat(bosses)/7))/2);
        }

        // Output.
        document.getElementById("content").innerHTML = 
            `<h2>Results:</h2>
            <p>Given you have found ` + book_2_souls + ` of the 6 ` + second_book.toLowerCase() + ` Souls, ` + book_3_souls + ` of the 6 ` + third_book.toLowerCase() + ` Souls, and killed ` + bosses + ` of the 7 bosses, the probability having all requirements for Graham met is equal to <b>` + (((s_bk_bk/2) + (s_s_bk/2))*100).toFixed(2) + `%</b>.</p>
            <p>The probability of guessing correctly on your first attempt is <b>` + ((p_total)*100).toFixed(2) + `%</b>.</p>
            <button onclick="reset()">Restart</button>`;

    } else {
        // More user input.
        bosses = String(parseInt(document.getElementById("bosses").value) - 1);

        // Calculating probabilities, via Rule of Sum and Rule of Product.
        var bk_s_s = (parseFloat(book_2_souls)/6) * (parseFloat(book_3_souls)/6);
        var bk_bk_s = (parseFloat(bosses)/6) * (((parseFloat(book_2_souls)/6)/2) + ((parseFloat(book_3_souls)/6)/2));

        var p_total = 0;

        // The player only has souls of one of the possible colours.
        if (parseInt(book_2_souls) === 0 && parseInt(book_3_souls) !== 0) {
            p_total = ((( (((parseFloat(book_3_souls)/6) * (1/parseFloat(book_3_souls)))/2) ) * (parseFloat(bosses)/6))/2);

        } else if (parseInt(book_2_souls) !== 0 && parseInt(book_3_souls) === 0) {
            p_total = ((( (((parseFloat(book_2_souls)/6) * (1/parseFloat(book_2_souls)))/2) ) * (parseFloat(bosses)/6))/2);

        // The player only has souls of both missing colours.
        } else if (parseInt(book_2_souls) !== 0 && parseInt(book_3_souls) !== 0) {
            p_total = ((bk_s_s * (1/parseFloat(book_2_souls)) * (1/parseFloat(book_3_souls)))/2) + ((( (((parseFloat(book_2_souls)/6) * (1/parseFloat(book_2_souls)))/2) + (((parseFloat(book_3_souls)/6) * (1/parseFloat(book_3_souls)))/2) ) * (parseFloat(bosses)/6))/2);
        }

        // Output.
        document.getElementById("content").innerHTML = 
            `<h2>Results:</h2>
            <p>We find ourselves in a situation where one of the bosses killed was the objective for another book. Thus, only six possible bosses remain.</p>
            <p>Given you have found ` + book_2_souls + ` of the 6 ` + second_book.toLowerCase() + ` Souls, ` + book_3_souls + ` of the 6 ` + third_book.toLowerCase() + ` Souls, and killed ` + bosses + ` of the 6 <i>other</i> bosses, the probability having all requirements for Graham met is equal to <b>` + (((bk_s_s/2) + (bk_bk_s/2))*100).toFixed(2) + `%</b>.</p>
            <p>The probability of guessing correctly on your first attempt is <b>` + ((p_total)*100).toFixed(2) + `%</b>.</p>
            <button onclick="reset()">Restart</button>`;
    }
}

// Output processing for zero book input.
function submitZeroBookData() {
    // Obtaining user input from previous step.
    book_1_souls = document.getElementById("book_1_souls").value;
    book_2_souls = document.getElementById("book_2_souls").value;
    book_3_souls = document.getElementById("book_3_souls").value;
    bosses = document.getElementById("bosses").value;

    // Calculating probabilities - this is nested Rule of Sum and Rule of Product stuff. 
    var books_1_2 = (parseFloat(book_1_souls)/6) * (parseFloat(book_2_souls)/6);
    var books_1_3 = (parseFloat(book_1_souls)/6) * (parseFloat(book_3_souls)/6);
    var books_2_3 = (parseFloat(book_2_souls)/6) * (parseFloat(book_3_souls)/6);
    var bk1_s2 = (parseFloat(bosses)/7) * ((books_1_2/3) + (books_1_3/3) + (books_2_3/3));
    var bk2_s1 = ((parseFloat(bosses)/7) * (parseFloat(bosses-1)/6)) * (((parseFloat(book_1_souls)/6)/3) + ((parseFloat(book_2_souls)/6)/3) + ((parseFloat(book_3_souls)/6)/3));

    var p_total = 0;

    // The player only has souls of one colour.
    if (parseInt(book_1_souls) === 0 && parseInt(book_2_souls) === 0 && parseInt(book_3_souls) !== 0) {
        p_total = ((((parseFloat(bosses)/7) * (parseFloat(bosses-1)/6)) * ((((parseFloat(book_3_souls)/6) * (1/parseFloat(book_3_souls)))/3)))/2);

    } else if (parseInt(book_1_souls) === 0 && parseInt(book_2_souls) !== 0 && parseInt(book_3_souls) === 0) {
        p_total = ((((parseFloat(bosses)/7) * (parseFloat(bosses-1)/6)) * ((((parseFloat(book_2_souls)/6) * (1/parseFloat(book_2_souls)))/3)))/2);

    } else if (parseInt(book_1_souls) !== 0 && parseInt(book_2_souls) === 0 && parseInt(book_3_souls) === 0) {
        p_total = ((((parseFloat(bosses)/7) * (parseFloat(bosses-1)/6)) * ((((parseFloat(book_1_souls)/6) * (1/parseFloat(book_1_souls)))/3)))/2);

    // The player only has souls of two colours.
    } else if (parseInt(book_1_souls) === 0 && parseInt(book_2_souls) !== 0 && parseInt(book_3_souls) !== 0) {
        p_total = (((parseFloat(bosses)/7) * (((books_2_3 * (1/parseFloat(book_2_souls)) * (1/parseFloat(book_3_souls)))/3)))/2) + ((((parseFloat(bosses)/7) * (parseFloat(bosses-1)/6)) * ((((parseFloat(book_2_souls)/6) * (1/parseFloat(book_2_souls)))/3) + (((parseFloat(book_3_souls)/6) * (1/parseFloat(book_3_souls)))/3)))/2);

    } else if (parseInt(book_1_souls) !== 0 && parseInt(book_2_souls) === 0 && parseInt(book_3_souls) !== 0) {
        p_total = (((parseFloat(bosses)/7) * (((books_1_3 * (1/parseFloat(book_1_souls)) * (1/parseFloat(book_3_souls)))/3)))/2) + ((((parseFloat(bosses)/7) * (parseFloat(bosses-1)/6)) * ((((parseFloat(book_1_souls)/6) * (1/parseFloat(book_1_souls)))/3) + (((parseFloat(book_3_souls)/6) * (1/parseFloat(book_3_souls)))/3)))/2);

    } else if (parseInt(book_1_souls) !== 0 && parseInt(book_2_souls) !== 0 && parseInt(book_3_souls) === 0) {
        p_total = (((parseFloat(bosses)/7) * (((books_1_2 * (1/parseFloat(book_1_souls)) * (1/parseFloat(book_2_souls)))/3)))/2) + ((((parseFloat(bosses)/7) * (parseFloat(bosses-1)/6)) * ((((parseFloat(book_1_souls)/6) * (1/parseFloat(book_1_souls)))/3) + (((parseFloat(book_2_souls)/6) * (1/parseFloat(book_2_souls)))/3)))/2);

    // The player has souls of all three colours.
    } else if (parseInt(book_1_souls) !== 0 && parseInt(book_2_souls) !== 0 && parseInt(book_3_souls) !== 0) {
        p_total = (((parseFloat(bosses)/7) * (((books_1_2 * (1/parseFloat(book_1_souls)) * (1/parseFloat(book_2_souls)))/3) + ((books_1_3 * (1/parseFloat(book_1_souls)) * (1/parseFloat(book_3_souls)))/3) + ((books_2_3 * (1/parseFloat(book_2_souls)) * (1/parseFloat(book_3_souls)))/3)))/2) + ((((parseFloat(bosses)/7) * (parseFloat(bosses-1)/6)) * ((((parseFloat(book_1_souls)/6) * (1/parseFloat(book_1_souls)))/3) + (((parseFloat(book_2_souls)/6) * (1/parseFloat(book_2_souls)))/3) + (((parseFloat(book_3_souls)/6) * (1/parseFloat(book_3_souls)))/3)))/2);
    }

    // Output.
    document.getElementById("content").innerHTML = 
        `<h2>Results:</h2>
        <p>Given you have found ` + book_1_souls + ` of the 6 ` + first_book.toLowerCase() + ` Souls, ` + book_2_souls + ` of the 6 ` + second_book.toLowerCase() + ` Souls, ` + book_3_souls + ` of the 6 ` + third_book.toLowerCase() + ` Souls, and killed ` + bosses + ` of the 7 bosses, the probability having all requirements for Graham met is equal to <b>` + (((bk1_s2/2) + (bk2_s1/2))*100).toFixed(2) + `%</b>.</p>
        <p>The probability of guessing correctly on your first attempt is <b>` + ((p_total)*100).toFixed(2) + `%</b>.</p>
        <button onclick="reset()">Restart</button>`;
}