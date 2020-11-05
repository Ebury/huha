# Contribution guidelines

1. [Developing](#developing)
    1. [Style guide](#style-guide)
    1. [Linting](#linting)
    1. [Testing](#testing)
1. [Submitting changes](#submitting-changes)
    1. [Creating a PR](#creating-a-pr)
    1. [Quality Gates](#quality-gates)
    1. [Code Review](#code-review)
    1. [Evidence of Requirements Implementation](#evidence-of-requirements-implementation)
    1. [Merge conditions](#merge-conditions)
1. [Release](#release)
1. [Reporting a problem or requesting a change](#reporting-a-problem-or-requesting-a-change)
    1. [How to report a bug](#how-to-report-a-bug)
    1. [How to request an enhancement](#how-to-request-an-enhancement)
1. [Thanks](#thanks)

Hi there! We’d love your help if you're interested in contributing to HUHA. It is developed by the [Online team](https://fxsolutions.atlassian.net/wiki/spaces/TEAM/pages/119543461/ONL) members with contributions from other Ebury tech teams. Check the [VISION](VISION.md) for the project as well as the guidelines below to contribute.

These are the steps to contribute with a new change to this repository:

1. Create an **issue** in JIRA in your project board, complete the required information, add the issue to your current sprint, and set the status to the equivalent to "in progress".
2. Create a **branch** in the repository from `master` branch. The name of the branch starts with the JIRA issue identifier and some optional suffix. For example, for issue `ONL-123`, the branch can be named `ONL-123-task`.
3. In every **commit** messages, include a prefix `[ONL-123]` and then a descriptive message. Try to commit frequently and doing commits by atomic changes.
4. When your change is ready to be reviewed, create a [Pull Request](#creating-a-pr) (PR) from the JIRA issue and move your issue to the correct status.
5. Manage the [Evidence of Requirements Implementation](#evidence-of-requirements-implementation) (ERI) according to the guidelines and update the JIRA issue status.
6. During the [Code Review](#code-review) or **ERI** phases, reviewers could propose changes; and it means possible changes and new commits.
7. When the [Merge conditions](#Merge-conditions) are fulfilled, you can **merge** the code from the PR following the **squash** strategy and **close the issue** in JIRA.

## Developing

### Style guide

This project has been developed using plain JavaScript. It is not using any library or framework of development. However, to allow the use of the latest versions of JavaScript and ensure compatibility with most browsers, the code is transpiled during the building process via [Babel](https://github.com/babel/babel).

### Linting

We use the eslint plugin to lint our JavaScript code. To check your work before pushing, run:

```
npm run lint
```

### Testing

Tests can be launched running the following commands in the terminal, they will launch unit tests with Jest.

```
npm run test
```

## Submitting changes

These are the steps to contribute with a new change to this repository:

### Creating a PR

A **Pull Request** (PR) is the method of submitting contributions to the project. The project uses [GitHub](https://github.com/) for PR management and can be created from JIRA issues. The PR is a process for peer review by code maintainers and relevant developers involved in the changes. Considerations during the Pull Request creation:

* The **destination branch** of the Pull Request must be the `master` branch.
* The **title** follows the format: "[issue-id] type: Title of the issue" (i.e. `[ONL-123] chore: Changing the documentation`). Where the type of the commit follows [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.
* Update the **description** to include a descriptive text for changes with notes for the reviewers and screenshots if necessary.
* The default **reviewers** must be the code owners defined in the [CODEOWNERS](CODEOWNERS) file and you must include also some code owners related with third party services, when these changes affects them. Share the PR in [#online-reviews](https://app.slack.com/client/TFMC43PH7/C0132DEVAPM) Slack channel to be reviewed by Online team members.

### Quality Gates

After developing the changes and submitting a **Pull Request** there are a series of Quality Gates and approvals needed in order to merge the code to the `master` branch for releasing a new version.

There are **QG** automatically controlled by the **Continuous Integration** (CI) process at [CircleCI](https://circleci.com/), during the workflow's steps execution, and there are other **QG** that must be checked manually by the code owners. The manual **QG** to check are:

* Enough and appropriate tests coverage.
* Good documentation for new changes.
* Follow the [Style guide](#style-guide).

### Code Review

**Code Review** is an integral process of software development that helps identify bugs and defects before the testing **phase**. We use the Pull Request (PR) mechanism in Github to do this process. These are the considerations for the code review phase:

* The PR is considered **approved** when **some code owner** have approved the PR.
* The comments can be done at PR level or at detailed level.
* The comments can be in different levels of relevance: **mandatory** or **optional**.
    * The mandatory changes must have a associated **task** in the Pull Request view.
    * All the mandatory changes must be changed and the associated tasks marked as **done**.
* The code owners review the manual checks for **Style guide** of the project.
* If the change is rejected by the code owners and there is not possibility of modifications, the PR will be marked as **declined**, and the process do not continue. If it can be modified, the Pull Request should not be declined, only commented with mandatory changes.
* The code review phase is considered **finished** when all the mandatory changes are done and it is approved.

### Evidence of Requirements Implementation

**Evidence of Requirements Implementation** (ERI) is a process to verifying that a solution works for the user. In our process, the representative of the user is the **Product Owner** (PO). Depending on the kind of changes, there are a set of possibilities for the ERI:

* If it is a **technical change** and it is not affecting interfaces or the current behavior to the user, the PR approval by the **technical lead or code owners** is enough. In these cases, the code owners must include the message "No ERI required, approved for merge." to explicit the ERI approval in the PR.
* If the change involved **changes for the user**, affecting interfaces or third party applications, it is required to create an **evidence** showing the new behavior to the user. In the case of a evidence recording a video, the process follows the next steps:

1. Create the ERI video and set the name following the naming: `ERI - <Ticked-id> - <Title of the issue>.extension`.
2. Upload the video to the appropriate ERI [folder](https://fxsolutions.atlassian.net/wiki/spaces/PRODUCTS/pages/113541346/ERI+Phase#ERIPhase-Saving&StoringtheERIfiles) in Google drive.
3. Link the ERI video from the field `ERI link` in the JIRA issue.
4. Create an email following the [ERI Email Template for approvals](https://fxsolutions.atlassian.net/wiki/spaces/PRODUCTS/pages/113541346/ERI+Phase#ERIPhase-ERIEmailTemplateforapprovals) and send to the Product Owner and other related people. Copy to the code owners and related teams in the email.
5. When the **Product Owner and the related people** reply to the email with the approval, the ERI is approved. These people can ask you before approve the ERI and can be a conversation via email. See more details about the global guidelines in this [document](https://fxsolutions.atlassian.net/wiki/spaces/PRODUCTS/pages/113541346/ERI+Phase).

### Merge conditions

Before merging a code in a **Pull Request** to the `master` branch, it is required to comply with **all** the next conditions:

* The **Code Review** phase has **finished**.
* The **ERI** is **approved**.
* The **Continuous Integration** (CI) process marks the PR as **green**.
* There are no **merge conflicts**.
* The branch must be **updated** with the latest commit of `master` branch.
* The required fields in the issue are **filled**.
* The package.json version must be bumped following the [Semver](https://semver.org/) convention.
* The [CHANGELOG](CHANGELOG.md) must be updated with relevant information about the changes that have been made.

## Release

When a PR passes all the **Quality Gates** and is merged to the `master` branch, a new version of HUHA is released automatically.

Each time the code is merge into a remote branch the Continuous Integration process at [CircleCI](https://circleci.com/) is launched. This process consists of a CircleCI's workflow called `build-test-publish-release-deploy`. The process can be followed through its corresponding [pipelines page](https://app.circleci.com/pipelines/github/Ebury/huha).

The workflow steps or tasks to be executed depend on which branch the code has been merged into. If the code was merged to the development branch the tasks to build the library (`build`) and check the tests (`test`) will be executed. If the code was merge to `master`, in addition to those previously mentioned, the tasks that allow publishing the code in the [npm public registry](https://docs.npmjs.com/cli/v6/using-npm/registry) (`publish`), create a new GitHub release (`release`) and finally, deploy to our [AWS S3](https://aws.amazon.com/s3/) (`deploy`) will be executed.

## Reporting a problem or requesting a change

If you want to report a problem or request some change you can report an issue to [Eburyonline JIRA project board](https://fxsolutions.atlassian.net/jira/software/c/projects/ONL/issues?filter=allissues).

### How to report a bug

Depending on the kind of reporter, and when it is detected bugs will be reported as follows:

* If you are a **contributor or code owner** and detect a bug in this project, you must create a JIRA issue in your board with task type **Defect** (see [here](https://fxsolutions.atlassian.net/wiki/spaces/PRODUCTS/pages/123095173/Bugs+and+e2e+philosophy)).
    * If it is detected during the Software Development Life Cycle ([SDLC](https://fxsolutions.atlassian.net/wiki/spaces/PRODUCTS/pages/42795535/SDLC)), you must create it as subtask of the main task.
    * If it is detected during a release, as subtask of the release task.
    * In other cases, as task.
* **Support team members** will create the JIRA issue as **Bug** and communicate with the code owners if the bug comes from production environment (see [here](https://fxsolutions.atlassian.net/wiki/spaces/PRODUCTS/pages/123095173/Bugs+and+e2e+philosophy)).

### How to request an enhancement

If you want to request an enhancement of code in this project, you must create a new task in your board with the task type **Task**, filling the `Components` field with `Huha`, and communicate it to the code owners. The enhancement should be aligned with the [VISION](VISION.md) of the project. If you want to implement the enhancement, follow the [Submitting changes](#submitting-changes) guide to contribute. Thank you for your contributions!

## Thanks

Thanks! Contributing to HUHA should be easy. If you find any of this hard to figure out, let us know so we can improve our process or documentation!
