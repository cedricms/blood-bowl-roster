<script lang="ts">
    import { showSpinner } from '../../store/showSpinner.store';
    import FootballSpinner from '../uiComponents/footballSpinner.svelte';
    import { getRostersForUpload } from '../../helpers/localToFirebase';
    import { modalState } from '../../store/modal.store';
    import { currentUserStore } from '../../store/currentUser.store';
    import Button from '../uiComponents/button.svelte';
    import { onMount } from 'svelte';

    $: emailV = '';
    $: passwordV = '';
    $: usernameV = '';
    let formTouched = false;
    let emailError = '';
    let loadingText = '';

    onMount(() => {
        document.getElementById('username')?.focus();
    });

    async function register(e: Event) {
        modalState.enableClose(false);
        showSpinner.set(true);
        e.preventDefault();
        emailError = '';
        try {
            loadingText = 'Creating account.';
            await import('./firebaseAuth.service').then((service) =>
                service.createUser(emailV, passwordV, usernameV)
            );
            loadingText = 'Uploading saved rosters.';
            await import('./firebaseDB.service').then((service) => {
                const rosters = getRostersForUpload();
                service.uploadRosters(rosters);
            });
        } catch (error) {
            console.log({ error });
            if (error?.code === 'auth/email-already-in-use') {
                emailError = emailV;
            }
        } finally {
            modalState.enableClose(true);
            showSpinner.set(false);
        }
    }
    const touchForm = () => {
        formTouched = true;
    };
</script>

{#if $showSpinner}
    <FootballSpinner {loadingText} />
{:else if $currentUserStore}
    <div class="logged-in">
        <p>Successfully Registered!</p>
        <Button clickFunction={() => modalState.close()}>Okay</Button>
    </div>
{:else}
    <form
        class="registration-form"
        class:registration-form--touched={formTouched}
        on:submit|preventDefault={register}
    >
        <h2>Register your account</h2>
        <p class="intro-text">
            By registering an account, you will be able to log in from any
            device and maintain access to all your rosters. Any rosters
            currently stored will be uploaded to your account upon registration.
            There are no costs associated with creating an account.
        </p>
        <label for="username">Display name:</label>
        <input
            type="text"
            name="username"
            id="username"
            placeholder="your coach name"
            autocomplete="username"
            bind:value={usernameV}
            required
        />
        <br />
        <label for="email">Email:</label>
        <input
            type="email"
            name="email"
            id="email"
            placeholder="email that you will log in with"
            autocomplete="email"
            bind:value={emailV}
            required
        />
        {#if emailError}
            <p class="error"><strong>{emailError} already in use.</strong></p>
        {/if}
        <br />
        <label for="password">Password:</label>
        <input
            type="password"
            name="password"
            id="password"
            placeholder="make it unique"
            bind:value={passwordV}
            required
            minlength="6"
        />

        <p>
            Please ensure to read our <a
                href="https://blog.bbroster.com/terms-of-use/"
                target="_blank"
                class="blog-link">Terms of Use</a
            >
            and
            <a
                href="https://blog.bbroster.com/private-policy/"
                title=""
                target="_blank"
                class="blog-link">Privacy Policy</a
            > documents before completing your registration.
        </p>

        <!-- {#if $savedRosterIndex.index.length > 0}
            <label for="upload-lists">Upload saved rosters:</label>
            <input
                type="checkbox"
                id="upload-lists"
                name="upload-lists"
                bind:checked={updateSavedRosters}
            />
            <br />
        {/if} -->
        <button class="rounded-button" on:focus={touchForm}>Register</button>
    </form>
{/if}

<style lang="scss">
    .registration-form {
        display: flex;
        flex-direction: column;
        padding: 20px;
        margin: 0 auto;
        max-width: 400px;
        &--touched {
            input:invalid {
                border-color: var(--main-colour);
            }
        }
    }
    .intro-text {
        margin-top: 0;
    }

    input {
        font-size: 16px;
        margin-bottom: 8px;
        height: 48px;
    }

    label {
        margin-bottom: 4px;
    }

    .error {
        color: var(--main-colour);
    }

    .logged-in {
        text-align: center;
        p {
            font-family: var(--display-font);
            font-size: 20px;
        }
    }
</style>
