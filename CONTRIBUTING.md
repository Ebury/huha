Hi there! We’d love your help if you're interested in contributing to HUHA. It is developed by the [Online team](https://fxsolutions.atlassian.net/wiki/spaces/TEAM/pages/119543461/ONL) members with contributions from other Ebury tech teams. Check the [VISION](VISION.md) for the project as well as the guidelines below to contribute.

These are the steps to contribute with a new change to this repository:

1. Create an **issue** in JIRA in your project board, complete the required information, add the issue to your current sprint and set the status to the equivalent to "in progress".
2. Create a **branch** in the repository from `master` branch. The name of the branch starts with the JIRA issue identifier and some optional suffix. For example, for issue `ONL-123`, the branch can be named `ONL-123-task`.
3. In every **commit** messages, include a prefix `[ONL-123]` and then a descriptive message. Try to commit frequently and doing commits by atomic changes.
4. When your change is ready to be reviewed, create a [Pull Request](#markdown-header-creating-a-pr) (PR) from the JIRA issue and move your issue to the correct status.
5. Manage the [Evidence of Requirements Implementation](#markdown-header-evidence-of-requirements-implementation) (ERI) according to the guidelines and update the JIRA issue status.
6. During the [Code Review](#markdown-header-code-review) or **ERI** phases, reviewers could propose changes; and it means possible changes and new commits.
7. When the [Merge conditions](#markdown-header-Merge-conditions) are fulfilled, you can **merge** the code from the PR following the **squash** strategy and **close the issue** in JIRA.

## Developing

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

* The **destination branch** of the Pull Request must be `master` branch.
* The **title** follows the format: [issue-id] type: Title of the issue. (i.e. `[ONL-123] chore: Changing the documentation`) Where the type of the commit follows [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.
* Update the **description** to include a descriptive text for changes with notes for the reviewers and screenshots if necessary.
* The default **reviewers** must be the code owners defined in the [CODEOWNERS](CODEOWNERS) file and you must include also some code owners related with third party services, when these changes affects them. Share the PR in [#online-reviews](https://app.slack.com/client/TFMC43PH7/C0132DEVAPM) Slack channel to be reviewed by Online team members.

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
3. Link the ERI video from the field ERI link in the JIRA issue.
4. Create an email following the [ERI Email Template for approvals](https://fxsolutions.atlassian.net/wiki/spaces/PRODUCTS/pages/113541346/ERI+Phase#ERIPhase-ERIEmailTemplateforapprovals) and send to the Product Owner and other related people. Copy to the code owners and related teams in the email.
5. When the **Product Owner and the related people** reply to the email with the approval, the ERI is approved. These people can ask you before approve the ERI and can be a conversation via email. See more details about the global guidelines in this [document](https://fxsolutions.atlassian.net/wiki/spaces/PRODUCTS/pages/113541346/ERI+Phase).

### Merge conditions

Before merging a code in a **Pull Request** to the `master` branch, it is required to comply with **all** the next conditions:

* The **Code Review** phase has **finished**.
* The **ERI** is **approved**.
* The **Continuous Integration** (CI) process marks the PR as **green**.
* There are no **merge conflicts**.
* The branch must be **updated** with the latest commit of `master` branch.
* The [required fields](https://fxsolutions.atlassian.net/wiki/spaces/PRODUCTS/pages/913015365/Merging+code) in the issue are **filled**.
