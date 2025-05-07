# ClientRateLimit

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**duration** | **String** | The sliding window time slice duration for which this quota applies. This value must conform to the ISO8601 format, see the enum for allow values. | 
**quota** | **Number** | The maximum number of requests allowed during the duration. | 



## Enum: DurationEnum


* `PT0S` (value: `"PT0S"`)

* `P1M` (value: `"P1M"`)

* `P1D` (value: `"P1D"`)

* `PT1H` (value: `"PT1H"`)

* `PT5M` (value: `"PT5M"`)





## Enum: QuotaEnum


* `100` (value: `100`)

* `1000` (value: `1000`)

* `100000` (value: `100000`)

* `1000000` (value: `1000000`)




