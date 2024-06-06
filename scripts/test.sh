# Colored output helper functions
success() { echo -e "\\033[32m[INFO] $*\\033[0m"; }
error() { echo -e "\\033[31m[ERROR] $*\\033[0m"; }

# check if .env and .env.test exists
if [ -f .env.test ] && [ -f .env ]; then
    success ".env and .env.test exists"
else
    error ".env or .env.test does not exist"
    exit 1
fi

success "Renaming .env to .env.bak"
if [ -f .env ]; then
    success ".env exists"
    mv .env .env.bak
else
    error ".env does not exist"
    restore_env 1  # Call restore_env with exit code 1
    exit 1
fi

# Rename .env.test to .env
success "Renaming .env.test to .env"
if [ -f .env.test ]; then
    success ".env.test exists"
    mv .env.test .env
else
    error ".env.test does not exist"
    restore_env 1  # Call restore_env with exit code 1
    exit 1
fi

success "Building and running the test"

# Trap function to handle script termination or interruption
restore_env() {
    EXIT_CODE=$1
    if [ -f .env ]; then
        mv .env .env.test
    fi
    if [ -f .env.bak ]; then
        mv .env.bak .env
    fi
    
    if [ $EXIT_CODE -ne 0 ]; then
        error "Script failed with exit code $EXIT_CODE"
    else
        success "Script ran successfully"
    fi
    exit $EXIT_CODE
}

# Run the commands and capture the exit code
pnpm build
BUILD_EXIT_CODE=$?

if [ $BUILD_EXIT_CODE -ne 0 ]; then
    restore_env $BUILD_EXIT_CODE
else
    pnpm test
    TEST_EXIT_CODE=$?
    if [ $TEST_EXIT_CODE -ne 0 ]; then
        restore_env $TEST_EXIT_CODE
    else
        restore_env 0
    fi
fi