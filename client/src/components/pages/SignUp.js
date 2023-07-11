import React from 'react';
import '../../App.css';
import Footer from '../Footer';

function SignUp (){

  return (
<>
<div className='sign-up'>

  <video src="/videos/video1.mp4" autoPlay loop muted />
  <p>
      
    <div class="container">
			<form action="signup.html" method="post" id="signup">
				<h1>Sign Up Now</h1>
				<div class="field">
					<label for="name">Name:</label>
					<input type="text" id="name" name="name" placeholder="Enter your fullname" />
					<small></small>
				</div>
				<div class="field">
					<label for="email">Email:</label>
					<input type="text" id="email" name="email" placeholder="Enter your email address" />
					<small></small>
				</div>
        <div class="password">
					<label for="email">Password:</label>
					<input type="text" id="password" name="email" placeholder="Enter your new password" />
					<small></small>
				</div>
				<div class="field">
					<button id="register-button" type="submit" class="full">Register</button>
				</div>
			</form>
		</div>
    </p>
    </div>
    <Footer/>
    </>
  );
}

export default SignUp;
