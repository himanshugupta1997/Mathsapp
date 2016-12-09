/**
 * Created by himanshu on 16/10/16.
 */

var A = [];

function intialize() {


    console.log("intialize");
    for(var i = 0 ; i < 9; ++i)
    {
        A[i] = [];
    }

    for(i = 0; i < 9; ++i)
    {
        for(var j = 0; j < 9; ++j )
        {
            var temp = $('#cell' + i + '' + j).val();
            //console.log(temp);
            if(temp == 'undefined' || temp == null || typeof temp == 'undefined' || temp == '')
            {
                temp = 0;
            }
            console.log(temp);
            A[i][j] = temp;

        }
    }

     console.log(A);
    Controller();

}

//intialise();

function Check() {
    
    var i , j , k;
    /* This Checks row and columns */
    for(i = 0 ; i < 9; ++i)
    {
        for(j = 0 ; j < 9; ++j)
        {

            if(A[i][j] == 0)
            {
                continue;
            }

            for(k = 0 ; k < 9; k++)
            {
                if(k == i)
                {
                    continue;
                }
                if(A[i][j] == A[k][j])
                {
                    return false;
                }
            }
            for(k = 0 ; k < 9; k++)
            {
                if(k == j)
                {
                    continue;
                }
                if(A[i][j] == A[i][k])
                {
                    return false;
                }
            }
        }
    }
    console.log("Rows checked");
    console.log("Columns checked");
    
    /* Now to check the boxes */
    
    for(i = 0 ; i < 9; ++i)
    {
        for(j = 0 ; j < 9; ++j)
        {
            if(A[i][j] == 0)
            {
                continue;
            }
            for(k = 3 * Math.floor(i/3); k < (3 *Math.floor(i/3)) + 3; ++k )
            {
                if(k == i)
                {
                    continue;
                }
                var l;
                for(l = 3 * Math.floor(j/3); l < (3 * Math.floor(j/3)) + 3; ++l)
                {
                    if(l == j)
                    {
                        continue;
                    }
                    if(A[i][j] == A[k][l])
                    {
                        return false;
                    }
                }
            }
            
        }
    }
    
    return true;
    
    
}

function Controller() {
    
    console.log("Controller");
    var flag = Check();
    console.log("Check function result");
    console.log(flag);
    if(flag == false)
    {
        alert("Wrong Sudoku problem inputted. Please input a correct one to solve");
        Clear();
        return 0;
    }
    var f = SolveSudoku(0, 0);
    console.log(f);
    console.log(A);
    if(f == false)
    {
        alert("Sudoku cant be solved");

    }
    for(var i = 0 ; i < 9; ++i)
    {
        for(var j = 0 ; j < 9; ++j)
        {
            var str = "#cell" + i + '' + j;
            console.log(str);
            var t = $(str);
            console.log(t);
            t.val(A[i][j]);
        }

    }
    console.log("Done");
    if(f)
    {
        return 1;
    }
    else
    {
        return 2;
    }
}

function GetNumbers(i , j) {

  //  // console.log("Get Numbers ");
    // console.log("Indexes are " + i + " " + j);
    var N = [];
    N[0] = -1;
  //  // console.log("First Loop");
    for(var  i1  = 1; i1 <= 9 ; ++i1)
    {
        N[i1] = 0;
    }
    for(k = 0 ; k < 9; k++)
    {
        if(k == i || A[k][j] == 0)
        {
            continue;
        }
        N[A[k][j]]++;

    }
    //// console.log("Rows checked");
    for(k = 0 ; k < 9; k++)
    {
        if(k == j || A[i][k] == 0)
        {
            continue;
        }
        N[A[i][k]]++;
    }
    //// console.log("Columns checked");
   // // console.log("Columns checked");
    for(k = 3 * Math.floor(i/3); k < (3 *Math.floor(i/3)) + 3; ++k )
    {
        //// console.log("K is " + k);
        if(k == i)
        {
            continue;
        }
        var l;
        for(l = 3 * Math.floor(j/3); l < (3 * Math.floor(j/3)) + 3; ++l)
        {
          //  // console.log("L is " + l);
            if(l == j)
            {
                continue;
            }

            N[A[k][l]]++;

        }
    }

    // console.log("Returning");
    return N;


}

function SolveSudoku(i , j) {


    // console.log("Solve Sudoku Called for ");
    // console.log(i);
    // console.log(j);
    if(j == 9)
    {
        j = 0;
        i = i + 1;
    }

    if(i == 9)
    {
        return true;
    }


    if(A[i][j] != 0)
    {
        return SolveSudoku(i, j + 1);
    }
    // console.log("GET Numbers");

    var N = GetNumbers(i ,j);
    for(var i1 = 1 ; i1 <= 9; ++i1 )
    {
        if(N[i1] == 0)
        {
            A[i][j] = i1;
            var flag = SolveSudoku(i, j + 1);
            if(flag)
            {
                return true;
            }
            continue;
        }
    }

    A[i][j] = 0;
    return false;

}

function Clear() {

    console.log("Clear called");
    A = [];
    for(var i = 0 ; i < 9 ; ++i)
    {
        for(var j = 0 ; j < 9 ; ++j)
        {
            $('#cell' + i + '' + j).val("");
        }
    }
    return;
}