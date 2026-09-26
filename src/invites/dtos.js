const Invite = Object.freeze({
  ConflictResolutionStrategyEnum: Object.freeze({
    GENERATE_NEW_RECORD: 'GENERATE_NEW_RECORD',
    UNSAFE_FORCE_MERGE: 'UNSAFE_FORCE_MERGE',
    REPLACE_RECORD_DATA: 'REPLACE_RECORD_DATA',
    SKIP_CHANGES: 'SKIP_CHANGES'
  })
});

module.exports = { Invite };
