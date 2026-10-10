# Accounts, commerce and booking

## Applicability and status

These capabilities require a dedicated extension to the baseline before implementation. Selecting one does not mean a generic contact-form contract is sufficient. The library currently supplies extension requirements, not complete reusable capability contracts.

## Inputs to resolve

Use the corresponding authoritative rule to define the target-project contract:

- [Accounts — EXT-01](../rules/capabilities/extensions.md#ext-01).
- [Commerce — EXT-02](../rules/capabilities/extensions.md#ext-02).
- [Booking — EXT-03](../rules/capabilities/extensions.md#ext-03).

Record a module-specific contract, owner and acceptance matrix in the target project. Resolve provider requirements and sensitive data handling for that implementation. Follow the [shared selection and recording conventions](README.md#using-a-capability) and keep unresolved inputs explicit before dependent work.

## Verification

Derive checks from the agreed extension contract and applicable [baseline and technical rules](../rules/README.md). Record actual evidence in the [acceptance report](../templates/acceptance-report.md); the extension rule alone cannot certify the feature.
